import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/utils/dbSetup';
import { AIOutput, Notifications } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { chatSession } from '@/utils/Gemini';
import { templates } from '@/app/(data)/Templates';
import { auth } from '@clerk/nextjs/server';

type SubscriptionLevel = 'free' | 'starter' | 'pro' | 'mastermind';

const MAX_CREDITS: Record<SubscriptionLevel, number> = {
    free: 10000,
    starter: 25000,
    pro: 50000,
    mastermind: Infinity
};

const BUFFER_PERCENTAGE = 0.95; // 95% of the limit

async function addNotification(userId: string, title: string, message: string, type: 'success' | 'info' | 'warning') {
    await db.insert(Notifications).values({
        userId,
        title,
        message,
        type,
        createdAt: new Date(),
        isRead: false
    });
}

export async function POST(request: NextRequest) {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { formData, templateSlug, subscriptionLevel } = await request.json();

    // Get user's total usage
    const result: { aiResponse: string | null }[] = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, userId));

    const totalUsage = result.reduce((total, element) => total + (element.aiResponse?.length || 0), 0);

    // Check if user has reached the limit (with buffer)
    const maxCredits = MAX_CREDITS[subscriptionLevel as SubscriptionLevel] * BUFFER_PERCENTAGE;
    if (totalUsage >= maxCredits) {
        await addNotification(userId, 'Usage Limit Reached', 'You\'ve reached your usage limit. Please upgrade your plan.', 'warning');
        return NextResponse.json({ error: 'Credit limit reached', redirectTo: '/dashboard/billing' }, { status: 403 });
    }

    // Generate AI content
    const selectedPrompt = templates.find(t => t.slug === templateSlug)?.aiPrompt;
    const finalAIPrompt = JSON.stringify(formData) + ", " + selectedPrompt;
    const aiResult = await chatSession.sendMessage(finalAIPrompt);
    const aiResponse = aiResult.response.text();

    // Save to database
    const insertResult = await db.insert(AIOutput).values({
        formData: JSON.stringify(formData),
        templateSlug,
        aiResponse,
        createdBy: userId,
        createdAt: new Date().toISOString()
    });

    // Check if the insert was successful
    if (insertResult.rowCount > 0) {
        // Calculate new total usage
        const newTotalUsage = totalUsage + aiResponse.length;

        // Add success notification
        await addNotification(userId, 'Content Generated', 'Your AI-generated content is ready for review.', 'success');

        // Check if user is approaching the usage limit
        const usagePercentage = (newTotalUsage / MAX_CREDITS[subscriptionLevel as SubscriptionLevel]) * 100;
        if (usagePercentage >= 80 && usagePercentage < 100) {
            await addNotification(userId, 'Approaching Usage Limit', 'You\'re nearing your monthly usage limit. Consider upgrading your plan.', 'warning');
        }

        return NextResponse.json({ aiOutput: aiResponse, newTotalUsage });
    } else {
        await addNotification(userId, 'Content Generation Failed', 'There was an error generating your content. Please try again.', 'warning');
        return NextResponse.json({ error: 'Failed to save output' }, { status: 500 });
    }
}
