import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/utils/dbSetup';
import { AIOutput } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { chatSession } from '@/utils/Gemini';
import { templates } from '@/app/(data)/Templates';
import { auth } from '@clerk/nextjs/server';

const MAX_CREDITS = {
    free: 10000,
    starter: 25000,
    pro: 50000,
    mastermind: Infinity
};

const BUFFER_PERCENTAGE = 0.95; // 95% of the limit

export async function POST(request: NextRequest) {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { formData, templateSlug, subscriptionLevel } = await request.json();

    // Get user's total usage
    const result = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, userId));

    const totalUsage = result.reduce((total, element) => total + (element.aiResponse?.length || 0), 0);

    // Check if user has reached the limit (with buffer)
    const maxCredits = MAX_CREDITS[subscriptionLevel as keyof typeof MAX_CREDITS] * BUFFER_PERCENTAGE;
    if (totalUsage >= maxCredits) {
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
    if (insertResult) {
        // Calculate new total usage
        const newTotalUsage = totalUsage + aiResponse.length;

        return NextResponse.json({ aiOutput: aiResponse, newTotalUsage });
    } else {
        return NextResponse.json({ error: 'Failed to save output' }, { status: 500 });
    }
}
