import { templates } from '@/app/(data)/Templates'
import React, { useEffect, useState } from 'react'
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

const TemplateListSection = ({userSearchInput}: any) => {
    const [templateList, setTemplateList] = useState(templates);
    
    useEffect(() => {
        if(userSearchInput) {
            const filterData = templates.filter(item =>
                item.name.toLowerCase().includes(userSearchInput.toLowerCase())
            );

            setTemplateList(filterData)
        } else {
            setTemplateList(templates)
        }
    }, [userSearchInput])

    return (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-4 gap-4 p-8">
            {templateList.map((item: TEMPLATE, index: number) => (
                <TemplateCard key={index} {... item} />
            ))}
        </section>
    )
}

export default TemplateListSection
