import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { useSubscription } from '@/app/(context)/SubscriptionContext'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { LoaderIcon } from 'lucide-react'

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

    const fetchUsage = async () => {
        if (!user?.id) return;

        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.get('/api/get-usage');
            setTotalUsage(response.data.totalUsage);
        } catch (err) {
            console.error('Error fetching usage data:', err);
            setError('Failed to fetch usage data. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsage();

        // Set up polling
        const intervalId = setInterval(fetchUsage, 30000); // Poll every 30 seconds

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [user]);

    const usagePercentage = Math.min((totalUsage / MAX_CREDITS[subscriptionLevel]) * 100, 100);

    if (isLoading) return <div className="flex items-center justify-center text-blue-400"><LoaderIcon className="animate-spin" /></div>;
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
