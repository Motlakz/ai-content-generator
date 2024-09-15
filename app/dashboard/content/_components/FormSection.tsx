"use client"

import React, { useState, useEffect } from 'react'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { LoaderIcon } from 'lucide-react'

interface TemplateProps {
    selectedTemplate?: TEMPLATE;
    userFormInput: any;
    loading: boolean;
    initialFormData?: any;
}

const FormSection = ({ selectedTemplate, userFormInput, loading, initialFormData }: TemplateProps) => {
    const [formData, setFormData] = useState<any>(initialFormData || {});

    useEffect(() => {
        if (initialFormData) {
            setFormData(initialFormData);
        }
    }, [initialFormData]);

    const onSubmit = (e: any) => {
        e.preventDefault();
        userFormInput(formData)
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    return (
        <div className="p-4 shadow-md border rounded-lg bg-white">
            <Image
            // @ts-ignore
                src={selectedTemplate?.icon}
                alt="icon"
                width={70}
                height={70} 
            />
            <h2 className="font-bold text-2xl mb-2 text-blue-500">{selectedTemplate?.name}</h2>
            <p className="text-gray-400 text-sm">{selectedTemplate?.desc}</p>
            <form className="mt-6" onSubmit={onSubmit}>
                {selectedTemplate?.form?.map((item, index) => (
                    <div className="my-2 flex flex-col gap-2" key={index}>
                        <label className="font-bold" htmlFor="">{item.label}</label>
                        {item.field === "input" ?
                            <Input
                                name={item.name}
                                required={item?.required}
                                onChange={handleInputChange}
                                value={formData[item.name] || ''}
                            /> : item.field === "textarea" ?
                                <Textarea
                                    name={item.name}
                                    onChange={handleInputChange}
                                    value={formData[item.name] || ''}
                                /> : null
                        }
                    </div>
                ))}
                <Button type="submit" className="p-3 hover:bg-blue-600 bg-blue-500 w-full flex items-center gap-2" disabled={loading}>
                    {loading && <LoaderIcon className="animate-spin text-blue-400" />}
                    Generate Content
                </Button>
            </form>
        </div>
    )
}

export default FormSection
