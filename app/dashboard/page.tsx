"use client"

import React, { useState } from 'react'
import SearchSection from './_components/SearchSection'
import TemplateListSection from './_components/TemplateListSection'
import { useSubscription } from '@/app/(context)/SubscriptionContext'

const Dashboard = () => {
    const [userSearchInput, setUserSearchInput] = useState<string>('')
    const { subscriptionLevel } = useSubscription()

    return (
        <div>
            <SearchSection onSearchInput={(value: string) => setUserSearchInput(value)}/>
            <TemplateListSection userSearchInput={userSearchInput} subscriptionLevel={subscriptionLevel} />
        </div>
    )
}

export default Dashboard
