"use client"

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
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

interface PROPS {
    params: {
        "template-slug": string
    }
}

const CreateNewContent
 = (props:PROPS) => {
    const searchParams = useSearchParams()
    const selectedTemplate:TEMPLATE | undefined = templates?.find((item) => item.slug == props.params['template-slug'])
    const [loading, setLoading] = useState(false);
    const [aiOutput, setAiOutput] = useState("");
    const [formData, setFormData] = useState<any>({});
    const { user } = useUser()

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

    return (
        <>
            <Link href={"/dashboard"} className="px-4">
                <Button className="mt-6 bg-indigo-500 hover:bg-indigo-600"><ArrowBigLeft /> Back to main page</Button>
            </Link>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                <FormSection loading={loading} userFormInput={GenerateAIContent} selectedTemplate={selectedTemplate} initialFormData={formData} />
                <div className="col-span-2">
                    <OutputSection aiOutput={aiOutput} />
                </div>
            </section>
        </>
    )
}

export default CreateNewContent

