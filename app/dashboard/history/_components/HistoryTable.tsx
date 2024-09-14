"use client"

import React, { useEffect, useState } from 'react'
import { db } from '@/utils/dbSetup'
import { AIOutput } from '@/utils/schema'
import { desc, eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Copy, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { templates } from '@/app/(data)/Templates'

export interface HistoryItem {
    id: number
    templateSlug: string
    aiResponse: string
    createdAt: string
    wordCount: number
    templateName: string
    templateIcon: string
    formData: string;
}

const HistoryTable = () => {
    const [historyItems, setHistoryItems] = useState<HistoryItem[]>([])
    const { user } = useUser()

    useEffect(() => {
        const fetchHistory = async () => {
            if (user?.primaryEmailAddress?.emailAddress) {
                const results = await db.select()
                    .from(AIOutput)
                    .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress))
                    .orderBy(desc(AIOutput.createdAt))

                const formattedResults = results.map(item => {
                    const template = templates.find(t => t.slug === item.templateSlug)
                    return {
                        id: item.id,
                        templateSlug: item.templateSlug,
                        aiResponse: item.aiResponse || '',
                        createdAt: new Date(item.createdAt || '').toLocaleString(),
                        wordCount: item.aiResponse ? item.aiResponse.split(' ').length : 0,
                        templateName: template?.name || item.templateSlug,
                        templateIcon: template?.icon || '',
                        formData: item.formData || '',
                    }
                })

                setHistoryItems(formattedResults)
            }
        }

        fetchHistory()
    }, [user])

    const copyContent = (item: HistoryItem) => {
        const content = `Template: ${item.templateName}\nDate: ${item.createdAt}\nWord Count: ${item.wordCount}\n\nContent:\n${item.aiResponse}`
        navigator.clipboard.writeText(content)
            .then(() => alert('Content copied to clipboard!'))
            .catch(err => console.error('Failed to copy: ', err))
    }

    return (
        <div className="overflow-x-auto border py-8 px-4 rounded-lg bg-white">
            <article className="text-center">
                <h1 className="text-2xl font-bold">Content History</h1>
                <p className="my-2">Search your previously generated content history.</p>
            </article>

            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">Template</th>
                        <th className="px-4 py-2">Preview</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Word Count</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {historyItems.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">
                                <div className="flex items-center space-x-2">
                                    <Image
                                        src={item.templateIcon}
                                        alt={item.templateName}
                                        width={24}
                                        height={24}
                                    />
                                    <span>{item.templateName}</span>
                                </div>
                            </td>
                            <td className="px-4 py-2">
                                <div className="max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    {item.aiResponse}
                                </div>
                            </td>
                            <td className="px-4 py-2">{item.createdAt}</td>
                            <td className="px-4 py-2">{item.wordCount}</td>
                            <td className="px-4 py-2">
                                <div className="flex space-x-2">
                                    <Button
                                        onClick={() => copyContent(item)}
                                        size="sm"
                                        variant="outline"
                                        className="flex items-center hover:bg-pink-200 hover:text-pink-800"
                                    >
                                        <Copy className="w-4 h-4 mr-1" /> Copy
                                    </Button>
                                    <Link href={`/dashboard/content/${item.templateSlug}?formData=${encodeURIComponent(item.formData)}&aiOutput=${encodeURIComponent(item.aiResponse)}`}>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex items-center hover:bg-indigo-200 hover:text-indigo-800"
                                        >
                                            <ExternalLink className="w-4 h-4 mr-1" /> View
                                        </Button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HistoryTable
