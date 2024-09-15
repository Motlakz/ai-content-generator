import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/utils/dbSetup';
import { AIOutput } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { templates } from '@/app/(data)/Templates';
import { addWeeks, addMonths, addYears, isAfter } from 'date-fns';

export async function GET(request: NextRequest) {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const subscriptionLevel = request.nextUrl.searchParams.get('subscriptionLevel');

    const results = await db.select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, userId))
        .orderBy(desc(AIOutput.createdAt));

    const currentDate = new Date();
    let limitDate: Date | null = null;

    switch (subscriptionLevel) {
        case 'free':
            limitDate = addWeeks(currentDate, -1);
            break;
        case 'starter':
            limitDate = addMonths(currentDate, -1);
            break;
        case 'pro':
            limitDate = addYears(currentDate, -1);
            break;
        case 'mastermind':
            limitDate = null;
            break;
    }

    const formattedResults = results
        .filter(item => {
            if (!limitDate) return true; // No limit for mastermind
            const itemDate = new Date(item.createdAt || '');
            return isAfter(itemDate, limitDate);
        })
        .map(item => {
            const template = templates.find(t => t.slug === item.templateSlug);
            return {
                id: item.id,
                templateSlug: item.templateSlug,
                aiResponse: item.aiResponse || '',
                createdAt: new Date(item.createdAt || '').toLocaleString(),
                wordCount: item.aiResponse ? item.aiResponse.split(' ').length : 0,
                templateName: template?.name || item.templateSlug,
                templateIcon: template?.icon || '',
                formData: item.formData || '',
            };
        });

    return NextResponse.json(formattedResults);
}
