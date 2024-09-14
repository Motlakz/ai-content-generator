import { templates } from '@/app/(data)/Templates'
import React, { useEffect, useState } from 'react'
import TemplateCard from './TemplateCard'
import { useSubscription } from '@/app/(context)/SubscriptionContext'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export interface TEMPLATE {
    name: string,
    desc: string,
    icon: string,
    category: string,
    slug: string,
    aiPrompt: string,
    form?: FORM[],
}

export interface FORM {
    label: string,
    field: string,
    name: string,
    required?: boolean,
}

const TemplateListSection = ({userSearchInput}: any) => {
    const [templateList, setTemplateList] = useState(templates);
    const { subscriptionLevel } = useSubscription();

    const getTemplateCount = (level: string) => {
        switch (level) {
            case 'free':
                return 10;
            case 'starter':
                return 20;
            case 'pro':
                return 50;
            case 'mastermind':
                return templates.length; // All templates
            default:
                return 10; // Default to free plan
        }
    }

    useEffect(() => {
        let filteredTemplates = templates;

        if(userSearchInput) {
            filteredTemplates = templates.filter(item =>
                item.name.toLowerCase().includes(userSearchInput.toLowerCase())
            );
        }

        // Limit the number of templates based on subscription level
        const templateCount = getTemplateCount(subscriptionLevel);
        filteredTemplates = filteredTemplates.slice(0, templateCount);

        setTemplateList(filteredTemplates);
    }, [userSearchInput, subscriptionLevel])

    const renderUpgradeMessage = () => {
        switch (subscriptionLevel) {
            case 'free':
                return (
                    <div className="text-center my-8">
                        <p className="mb-4">Upgrade to Starter plan to access 10 more templates!</p>
                        <Button asChild variant="default" className="bg-blue-500 hover:bg-blue-600">
                            <Link href="/dashboard/billing">Upgrade to Starter</Link>
                        </Button>
                    </div>
                );
            case 'starter':
                return (
                    <div className="text-center my-8">
                        <p className="mb-4">Upgrade to Pro plan for 30 more templates and advanced features!</p>
                        <Button asChild variant="default" className="bg-blue-500 hover:bg-blue-600">
                            <Link href="/dashboard/billing">Upgrade to Pro</Link>
                        </Button>
                    </div>
                );
            case 'pro':
                return (
                    <div className="text-center my-8">
                        <p className="mb-4">Upgrade to Mastermind plan for unlimited templates and premium support!</p>
                        <Button asChild variant="default" className="bg-blue-500 hover:bg-blue-600">
                            <Link href="/dashboard/billing">Upgrade to Mastermind</Link>
                        </Button>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {templateList.map((item: TEMPLATE, index: number) => (
                    <TemplateCard key={index} {...item} />
                ))}
            </section>
            {renderUpgradeMessage()}
            {subscriptionLevel === 'pro' && (
                <div className="text-center my-4">
                    <p>As a Pro user, you have access to priority email support!</p>
                </div>
            )}
            {subscriptionLevel === 'mastermind' && (
                <div className="text-center my-4">
                    <p>Welcome, Mastermind user! You have unlimited access to all templates and features.</p>
                    <p>Need a custom template? Contact our support team!</p>
                </div>
            )}
        </>
    )
}

export default TemplateListSection
