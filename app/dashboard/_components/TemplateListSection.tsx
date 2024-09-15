import { templates } from '@/app/(data)/Templates'
import React, { useEffect, useState } from 'react'
import TemplateCard from './TemplateCard'
import { motion, AnimatePresence } from 'framer-motion'
import { Grid2x2, List } from 'lucide-react'

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
    const [viewMode, setViewMode] = useState('grid');

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    }

    return (
        <div className="p-4">
            <div className="flex justify-end mb-4">
                <button
                    className={`mr-2 p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : ''}`}
                    onClick={() => setViewMode('list')}
                >
                    <List size={24} />
                </button>
                <button
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : ''}`}
                    onClick={() => setViewMode('grid')}
                >
                    <Grid2x2 size={24} />
                </button>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={viewMode}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "flex flex-col space-y-4"}
                >
                    {templateList.map((item: TEMPLATE, index: number) => (
                        <motion.div key={index} variants={itemVariants}>
                            {/* @ts-ignore */}
                            <TemplateCard {...item} viewMode={viewMode} />
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default TemplateListSection
