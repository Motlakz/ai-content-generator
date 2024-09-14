"use client"

import React, { useState, useEffect, useContext } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import { templates } from '@/app/(data)/Templates'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowBigLeft } from 'lucide-react'
import { chatSession } from '@/utils/Gemini'
import { db } from '@/utils/dbSetup'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { MAX_CREDITS } from '../../_components/UsageTrack'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { useSubscription } from '@/app/(context)/SubscriptionContext'

interface PROPS {
    params: {
        "template-slug": string
    }
}

const CreateNewContent = (props:PROPS) => {
    const searchParams = useSearchParams()
    const selectedTemplate:TEMPLATE | undefined = templates?.find((item) => item.slug == props.params['template-slug'])
    const [loading, setLoading] = useState(false);
    const [aiOutput, setAiOutput] = useState("");
    const [formData, setFormData] = useState<any>({});
    const { user } = useUser();
    const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
    const { subscriptionLevel } = useSubscription();
    const router = useRouter();

    useEffect(() => {
        const formDataParam = searchParams.get('formData')
        const aiOutputParam = searchParams.get('aiOutput')

        if (formDataParam) {
            try {
                setFormData(JSON.parse(decodeURIComponent(formDataParam)))
            } catch (error) {
                console.error('Invalid formData JSON:', error)
            }
        }
        if (aiOutputParam) {
            setAiOutput(decodeURIComponent(aiOutputParam))
        }
    }, [searchParams])

    const GenerateAIContent = async (newFormData: any) => {
        if(totalUsage >= MAX_CREDITS[subscriptionLevel]) {
            router.push("/dashboard/billing")
            return
        }

        // Check if the user has access to this template based on their subscription
        if (!hasAccessToTemplate(selectedTemplate, subscriptionLevel)) {
            alert("You need to upgrade your plan to access this template.")
            router.push("/dashboard/billing")
            return
        }

        setLoading(true)
        const selectedPrompt = selectedTemplate?.aiPrompt;
        const finalAIPrompt = JSON.stringify(newFormData) + ", " + selectedPrompt;
        const result = await chatSession.sendMessage(finalAIPrompt);
        console.log(result.response.text())
        setAiOutput(result.response.text())
        await SaveInDb(newFormData, selectedTemplate?.slug, result?.response.text())
        setLoading(false)
    }

    const SaveInDb = async (formData: any, slug: any, aiResp: string) => {
        const result = await db.insert(AIOutput).values({
            formData: JSON.stringify(formData), // Convert formData to string
            templateSlug: slug,
            aiResponse: aiResp,
            createdBy: user?.primaryEmailAddress?.emailAddress ?? '',
            createdAt: new Date().toISOString()
        });

        console.log(result)
    }

    // Function to check if user has access to a template based on their subscription
    const hasAccessToTemplate = (template: TEMPLATE | undefined, level: string) => {
        if (!template) return false;
        const templateIndex = templates.findIndex(t => t.slug === template.slug);
        switch (level) {
            case 'free':
                return templateIndex < 10;
            case 'starter':
                return templateIndex < 20;
            case 'pro':
                return templateIndex < 50;
            case 'mastermind':
                return true;
            default:
                return false;
        }
    }

    return (
        <>
            <Link href={"/dashboard"} className="px-4">
                <Button className="mt-6 bg-indigo-500 hover:bg-indigo-600"><ArrowBigLeft /> Back to main page</Button>
            </Link>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                <FormSection loading={loading} userFormInput={GenerateAIContent} selectedTemplate={selectedTemplate} initialFormData={formData} />
                <div className="col-span-2">
                    <OutputSection aiOutput={aiOutput} templateSlug={props.params['template-slug']} />
                </div>
            </section>
        </>
    )
}

export default CreateNewContent

