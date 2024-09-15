import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/utils/dbSetup';
import { AIOutput } from '@/utils/schema';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { formData, templateSlug, aiResponse, createdBy, createdAt } = await request.json();

    try {
        const result = await db.insert(AIOutput).values({
            formData,
            templateSlug,
            aiResponse,
            createdBy,
            createdAt
        });

        return NextResponse.json({ message: 'AI output saved successfully', result });
    } catch (error) {
        console.error('Error saving AI output:', error);
        return NextResponse.json({ error: 'Failed to save AI output' }, { status: 500 });
    }
}
