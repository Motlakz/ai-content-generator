import React from 'react'
import { TEMPLATE } from './TemplateListSection'
import Image from 'next/image'
import Link from 'next/link'

const getGlassmorphicColor = (slug: string, category: string) => {
    const colors: { [key: string]: string } = {
        // Blog category
        'generate-blog-title': 'from-blue-400/30 to-indigo-400/30',
        'blog-content-generation': 'from-indigo-400/30 to-purple-400/30',
        'blog-topic-idea': 'from-purple-400/30 to-pink-400/30',
        
        // Youtube Tools category
        'youtube-seo-title': 'from-red-400/30 to-pink-400/30',
        'youtube-description': 'from-pink-400/30 to-rose-400/30',
        'youtube-tag': 'from-rose-400/30 to-orange-400/30',
        
        // Rewriting Tool category
        'rewrite-article': 'from-green-400/30 to-emerald-400/30',
        
        // Writing Assistant category
        'text-improver': 'from-yellow-400/30 to-amber-400/30',
        
        // Blog category (additional)
        'add-emoji-to-text': 'from-teal-400/30 to-cyan-400/30',
        
        // Instagram category
        'instagram-post-generator': 'from-fuchsia-400/30 to-purple-400/30',
        'instagram-hash-tag-generator': 'from-purple-400/30 to-violet-400/30',
        'instagram-post-idea-generator': 'from-violet-400/30 to-indigo-400/30',
        
        // English category
        'english-grammar-checker': 'from-sky-400/30 to-blue-400/30',
        
        // Coding category
        'write-code': 'from-slate-400/30 to-gray-400/30',
        'explain-code': 'from-gray-400/30 to-zinc-400/30',
        'code-bug-detector': 'from-zinc-400/30 to-neutral-400/30',
        
        // Marketing category
        'tagline-generator': 'from-lime-400/30 to-green-400/30',
        'product-description': 'from-emerald-400/30 to-teal-400/30',
    }
    
    return colors[slug] || 'from-gray-400/30 to-slate-400/30' // default color
}

const TemplateCard = (item: TEMPLATE) => {
    const glassBg = getGlassmorphicColor(item.slug, item.category);

    return (
        <Link href={"/dashboard/content/"+item?.slug} className="block h-full">
            <div className={`p-4 gap-4 shadow-md cursor-pointer rounded-lg flex flex-col border bg-gradient-to-br ${glassBg} backdrop-blur-sm hover:scale-105 transition-all delay-300 h-full`}>
                <div className="bg-white rounded-full p-2 w-fit">
                    <Image src={item.icon} alt="icon" width={40} height={40} />
                </div>
                <h2 className="font-medium text-lg text-gray-800">{item.name}</h2>
                <p className="text-gray-600 line-clamp-3 flex-grow">{item.desc}</p>
            </div>
        </Link>
    )
}

export default TemplateCard
