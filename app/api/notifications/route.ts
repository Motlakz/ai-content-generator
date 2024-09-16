import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/utils/dbSetup';
import { Notifications } from '@/utils/schema';
import { sql } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const result = await db.execute(sql`
            SELECT * FROM ${Notifications}
            WHERE "userId" = ${userId}
            ORDER BY "createdAt" DESC
        `);

        // Ensure we're returning an array
        const notifications = Array.isArray(result) ? result : result.rows || [];

        return NextResponse.json(notifications);
    } catch (error) {
        console.error('Failed to fetch notifications:', error);
        return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, notificationId } = await request.json();

    try {
        if (action === 'dismiss') {
            await db.execute(sql`
                DELETE FROM ${Notifications}
                WHERE id = ${notificationId} AND "userId" = ${userId}
            `);
        } else if (action === 'clearAll') {
            await db.execute(sql`
                DELETE FROM ${Notifications}
                WHERE "userId" = ${userId}
            `);
        } else {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update notifications:', error);
        return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 });
    }
}
