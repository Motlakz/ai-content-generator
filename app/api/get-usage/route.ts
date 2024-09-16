import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/utils/dbSetup';
import { AIOutput } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

const MAX_CREDITS = {
  free: 10000,
  starter: 25000,
  pro: 50000,
  mastermind: Infinity,
};

export async function GET(request: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch user's usage from the database
    const result = await db
      .select()
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, userId));

    // Calculate total usage
    const totalUsage = result.reduce(
      (total, element) => total + (element.aiResponse?.length || 0),
      0
    );

    // Fetch user subscription level
    const subscriptionLevel = 'starter';

    // Compare usage with max credits based on the subscription level
    const maxCredits = MAX_CREDITS[subscriptionLevel];
    if (totalUsage > maxCredits) {
      return NextResponse.json(
        { error: 'Credit limit exceeded', totalUsage, maxCredits },
        { status: 403 }
      );
    }

    return NextResponse.json({ totalUsage });
  } catch (error) {
    console.error('Error fetching usage data:', error);
    return NextResponse.json({ error: 'Failed to fetch usage data' }, { status: 500 });
  }
}
