// app/api/get-usage/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/utils/dbSetup';
import { AIOutput } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const result = await db
            .select()
            .from(AIOutput)
            .where(eq(AIOutput.createdBy, userId));

        const totalUsage = result.reduce((total, element) => total + (element.aiResponse?.length || 0), 0);

        return NextResponse.json({ totalUsage });
    } catch (error) {
        console.error('Error fetching usage data:', error);
        return NextResponse.json({ error: 'Failed to fetch usage data' }, { status: 500 });
    }
}
