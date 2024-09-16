import { db } from '@/utils/dbSetup';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { Subscriptions } from '@/utils/schema';

// GET subscription level for a user
export async function GET(request: NextRequest) {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Query the Subscriptions table using Drizzle ORM
        const userSubscription = await db
            .select()
            .from(Subscriptions)
            .where(eq(Subscriptions.userId, userId));

        return NextResponse.json({ subscriptionLevel: userSubscription?.[0]?.level || 'free' });
    } catch (error) {
        console.error('Error fetching subscription:', error);
        return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 });
    }
}

// POST to update the user's subscription level
export async function POST(request: NextRequest) {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Parse the request body to get subscriptionLevel
        const { subscriptionLevel } = await request.json();

        // Check if a subscription already exists for the user
        const existingSubscription = await db
            .select()
            .from(Subscriptions)
            .where(eq(Subscriptions.userId, userId));

        if (existingSubscription.length > 0) {
            // If subscription exists, update it
            await db
                .update(Subscriptions)
                .set({ level: subscriptionLevel, updatedAt: new Date() })  // Set the updated timestamp manually
                .where(eq(Subscriptions.userId, userId));
        } else {
            // If no subscription exists, insert a new one
            await db
                .insert(Subscriptions)
                .values({ userId, level: subscriptionLevel });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating subscription:', error);
        return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 });
    }
}
