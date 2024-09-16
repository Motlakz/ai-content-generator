"use client"

import { templates } from '@/app/(data)/Templates'
import React, { useEffect, useState } from 'react'
import TemplateCard from './TemplateCard'
import { motion, AnimatePresence } from 'framer-motion'
import { Grid2x2, List, MoveLeftIcon, MoveRightIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"

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

const TemplateListSection: React.FC<{ userSearchInput?: string }> = ({ userSearchInput }) => {
    const [templateList, setTemplateList] = useState<TEMPLATE[]>(templates);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [mounted, setMounted] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState(0);
    const cardsPerPage = 8;

    useEffect(() => {
        setMounted(true);
        if(userSearchInput) {
            const filterData = templates.filter(item =>
                item.name.toLowerCase().includes(userSearchInput.toLowerCase())
            );
            setTemplateList(filterData)
        } else {
            setTemplateList(templates)
        }
        setCurrentPage(0);
    }, [userSearchInput])

    const pageCount = Math.ceil(templateList.length / cardsPerPage);
    const offset = currentPage * cardsPerPage;
    const currentCards = templateList.slice(offset, offset + cardsPerPage);

    const containerVariants = {
        hidden: (custom: { direction: number, viewMode: string }) => ({
            x: custom.direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                staggerChildren: 0.05
            }
        },
        exit: (custom: { direction: number, viewMode: string }) => ({
            x: custom.direction > 0 ? -1000 : 1000,
            opacity: 0,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
            }
        })
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

    const handlePageChange = (newPage: number) => {
        setDirection(newPage > currentPage ? 1 : -1);
        setCurrentPage(newPage);
    }

    const handleViewModeChange = (newMode: 'grid' | 'list') => {
        setViewMode(newMode);
        setDirection(0); // Reset direction for view mode change
    }

    return (
        <AnimatePresence>
            {mounted && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-dark-400 rounded-lg shadow-lg overflow-hidden min-h-screen"
                >
                    <div className="flex justify-between items-center gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                            <Button
                                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                size="sm"
                                onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                                disabled={currentPage === 0}
                            >
                                <MoveLeftIcon className="mr-2 h-4 w-4" /> Previous
                            </Button>
                            <Button
                                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                size="sm"
                                onClick={() => handlePageChange(Math.min(pageCount - 1, currentPage + 1))}
                                disabled={currentPage === pageCount - 1}
                            >
                                Next <MoveRightIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex-1 text-sm text-gray-500 dark:text-gray-400">
                            Showing {offset + 1} to {Math.min(offset + cardsPerPage, templateList.length)} of {templateList.length} results
                        </div>
                        
                        <div className="flex justify-end ml-4">
                            <Button
                                className={`mr-2 p-2 rounded ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-gray-400 hover:bg-indigo-400'}`}
                                onClick={() => handleViewModeChange('list')}
                            >
                                <List size={24} />
                            </Button>
                            <Button
                                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-gray-400 hover:bg-indigo-400'}`}
                                onClick={() => handleViewModeChange('grid')}
                            >
                                <Grid2x2 size={24} />
                            </Button>
                        </div>
                    </div>
                    <AnimatePresence custom={{ direction, viewMode }} mode="wait">
                        <motion.div
                            key={`${currentPage}-${viewMode}`}
                            custom={{ direction, viewMode }}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "flex flex-col space-y-4"}
                        >
                            {currentCards.map((item: TEMPLATE) => (
                                <motion.div key={item.slug} variants={itemVariants}>
                                    {/* @ts-ignore */}
                                    <TemplateCard {...item} viewMode={viewMode} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default TemplateListSection
