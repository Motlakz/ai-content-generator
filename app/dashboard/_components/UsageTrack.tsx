import React, { useEffect, useState, useContext } from 'react'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { useSubscription } from '@/app/(context)/SubscriptionContext'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import axios from 'axios'
import { AlertTriangle, LoaderIcon } from 'lucide-react'
import UpgradeAlert from './UpgradeAlert'

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
    const [displayUsage, setDisplayUsage] = useState<number>(0);
    const [isLimitExceeded, setIsLimitExceeded] = useState<boolean>(false);
    const [showUpgradeAlert, setShowUpgradeAlert] = useState<boolean>(false);

    const fetchUsage = async () => {
        if (!user?.id) return;

        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.get('/api/get-usage');
            const maxCredits = MAX_CREDITS[subscriptionLevel as keyof typeof MAX_CREDITS];
            
            setTotalUsage(response.data.totalUsage);
            setDisplayUsage(Math.min(response.data.totalUsage, maxCredits));
            const exceeded = response.data.totalUsage > maxCredits;
            setIsLimitExceeded(exceeded);
            
            // Show the upgrade alert if the limit is exceeded for any plan except mastermind
            if (exceeded && subscriptionLevel !== 'mastermind') {
                setShowUpgradeAlert(true);
            } else {
                setShowUpgradeAlert(false); // Reset alert if not exceeded
            }
        } catch (err) {
            console.error('Error fetching usage data:', err);
            setError('Failed to fetch usage data. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsage();
    }, [user, subscriptionLevel]);

    const maxCredits = MAX_CREDITS[subscriptionLevel as keyof typeof MAX_CREDITS];
    const usagePercentage = (displayUsage / maxCredits) * 100;

    if (isLoading) return <div className="flex items-center justify-center text-blue-400"><LoaderIcon className="animate-spin" /></div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="w-full p-4">
            <div className="bg-blue-500 text-white rounded-lg p-3 text-center">
                <h2 className="font-medium text-sm">Credits ({subscriptionLevel} plan)</h2>
                <div className="h-2 bg-blue-50 rounded-full w-full my-2">
                    <div 
                        className="h-2 bg-pink-500 rounded-full" 
                        style={{ width: `${usagePercentage}%` }}
                    />
                </div>
                <div className="flex justify-between items-center flex-col">
                    <h2 className="text-sm">
                        {displayUsage.toLocaleString()} / {maxCredits === Infinity ? 'Unlimited' : maxCredits.toLocaleString()}
                    </h2>
                    {isLimitExceeded && (
                        <div className="flex items-center bg-yellow-50 p-2 rounded-md mt-4 w-full text-yellow-600">
                            <AlertTriangle size={16} className="mr-1" />
                            <span className="text-xs">Limit exceeded</span>
                        </div>
                    )}
                </div>
            </div>
            {subscriptionLevel !== 'mastermind' && (
                <Button asChild variant="default" className="w-full mt-2 py-1 px-2 text-sm bg-white text-blue-600 hover:bg-blue-100 rounded-lg">
                    <Link href="/dashboard/billing">
                        Upgrade for more credits
                    </Link>
                </Button>
            )}
            <UpgradeAlert 
                isOpen={showUpgradeAlert} 
                onClose={() => setShowUpgradeAlert(false)}
            />
        </div>
    )
}

export default UsageTrack;
