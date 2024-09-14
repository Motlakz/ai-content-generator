import { Button } from '@/components/ui/button'
import { db } from '@/utils/dbSetup'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { HistoryItem } from '../history/_components/HistoryTable'

const UsageTrack = () => {
    const { user } = useUser();
    const [usedCredits, setUsedCredits] = useState(0);
    const [totalCredits] = useState(10000); // Assuming 10000 is the total credits

    useEffect(() => {
        user && GetData();

    }, [user])
    
    const GetData = async () => {
        const result:HistoryItem[] = await db.select().from(AIOutput).where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress))
        GetTotalUsage(result)
    }

    const GetTotalUsage = (result:HistoryItem[]) => {
        let totalWords = 0;
        result.forEach(element => {
            const words = element.aiResponse?.split(/\s+/).filter(word => word.length > 0) || [];
            totalWords += words.length;
            console.log(`Response words: ${words.length}, Running total: ${totalWords}`);
        })
        
        // Assuming 1 credit = 1 word
        const usedCredits = Math.min(totalWords, totalCredits);
        setUsedCredits(usedCredits);
        console.log(`Total words (credits used): ${usedCredits}`);
        console.log(`Total available credits: ${totalCredits}`);
    }

    const usagePercentage = (usedCredits / totalCredits) * 100;
    console.log(`Usage percentage: ${usagePercentage.toFixed(2)}%`);

    return (
        <div className="m-4">
            <div className="bg-blue-500 text-white rounded-lg p-4">
                <h2 className="font-medium text-center">Credits</h2>
                <div className="h-2 bg-blue-50 rounded-full w-full my-4">
                    <div className="h-2 bg-pink-500 rounded-full" style={{ width: `${usagePercentage}%`}}></div>
                </div>
                <h2>{usedCredits}/{totalCredits}</h2>
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
