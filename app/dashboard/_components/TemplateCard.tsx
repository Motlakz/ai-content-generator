import React from 'react'
import { TEMPLATE } from './TemplateListSection'
import Image from 'next/image'
import Link from 'next/link'

const TemplateCard = (item: TEMPLATE) => {
    return (
        <Link href={"/dashboard/content/"+item?.slug} className="block h-full">
            <div className="p-4 gap-4 shadow-md cursor-pointer rounded-lg flex flex-col border bg-white hover:scale-105 transition-all delay-300 h-full">
                <Image src={item.icon} alt="icon"
                    width={50}
                    height={50}
                />
                <h2 className="font-medium text-lg">{item.name}</h2>
                <p className="text-gray-500 line-clamp-3 flex-grow">{item.desc}</p>
            </div>
        </Link>
    )
}

export default TemplateCard
