import { templates } from '@/app/(data)/Templates'
import React from 'react'
import TemplateCard from './TemplateCard'

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
const TemplateListSection = () => {
    return (
        <div>
            {templates.map((item: TEMPLATE, index: number) => (
                <TemplateCard key={index} {... item} />
            ))}
        </div>
    )
}

export default TemplateListSection
