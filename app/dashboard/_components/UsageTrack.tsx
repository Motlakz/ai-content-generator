import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { useSubscription } from '@/app/(context)/SubscriptionContext'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/dbSetup'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import React, { useEffect, useState, useCallback, useContext } from 'react'

export const MAX_CREDITS = {
    free: 10000,
    starter: 25000,
    pro: 50000,
    mastermind: Infinity
};

const UsageTrack: React.FC = () => {
    const { user } = useUser();
    const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
    const { subscriptionLevel } = useSubscription();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // @ts-ignore
    const getTotalUsage = useCallback((result: AIOutput[]): number => {
        return result.reduce((total, element) => total + (element.aiResponse?.length || 0), 0);
    }, []);

    const getData = useCallback(async () => {
        if (!user?.primaryEmailAddress?.emailAddress) return;

        try {
            setIsLoading(true);
            setError(null);
            const result = await db
                .select()
                .from(AIOutput)
                .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress));
            
            const usage = getTotalUsage(result);
            setTotalUsage(usage);
        } catch (err) {
            console.error('Error fetching usage data:', err);
            setError('Failed to fetch usage data. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, [user, getTotalUsage]);

    useEffect(() => {
        if (user) {
            getData();
        }
    }, [user, getData]);

    const usagePercentage = Math.min((totalUsage / MAX_CREDITS[subscriptionLevel]) * 100, 100);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="m-4">
            <div className="bg-blue-500 text-white rounded-lg p-4">
                <h2 className="font-medium text-center">Credits ({subscriptionLevel} plan)</h2>
                <div className="h-2 bg-blue-50 rounded-full w-full my-4">
                    <div 
                        className="h-2 bg-pink-500 rounded-full" 
                        style={{ width: `${usagePercentage}%` }}
                    />
                </div>
                <h2>{totalUsage.toLocaleString()} / {MAX_CREDITS[subscriptionLevel].toLocaleString()}</h2>
            </div>
            <Button asChild variant="default" className="p-6 w-full bg-white-600 font-bold hover:text-white hover:bg-blue-500 mt-4 text-blue-600 rounded-lg">
                <Link href="/dashboard/billing">
                    Upgrade for more credits
                </Link>
            </Button>
        </div>
    )
}

export default UsageTrack
