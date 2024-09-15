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
import { useUser } from '@clerk/nextjs'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { useSubscription } from '@/app/(context)/SubscriptionContext'
import axios from 'axios'

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

    const fetchUsage = async () => {
        if (!user?.id) return;

        try {
            const response = await axios.get('/api/get-usage');
            setTotalUsage(response.data.totalUsage);
        } catch (err) {
            console.error('Error fetching usage data:', err);
        }
    };

    const GenerateAIContent = async (newFormData: any) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/generate-ai-content', {
                formData: newFormData,
                templateSlug: selectedTemplate?.slug,
                subscriptionLevel,
            });
            
            setAiOutput(response.data.aiOutput);
            
            // Update total usage
            if (setTotalUsage) {
                setTotalUsage(response.data.newTotalUsage);
            }

            // Fetch the latest usage data
            await fetchUsage();

            // Trigger a re-fetch of the history data
            router.refresh();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 403) {
                    router.push("/dashboard/billing");
                } else {
                    console.error('Error generating AI content:', error.response?.data || error.message);
                }
            } else {
                console.error('Unexpected error:', error);
            }
        } finally {
            setLoading(false);
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
