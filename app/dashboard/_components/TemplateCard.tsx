import React from 'react'
import { TEMPLATE } from './TemplateListSection'
import Image from 'next/image'

const TemplateCard = (item: TEMPLATE) => {
    return (
        <div className="p-4 shadow-md rounded-lg flex flex-col border bg-white">
            <Image src={item.icon} alt="icon"
                width={50}
                height={50}
            />
            <h2>{item.name}</h2>
            <p>{item.desc}</p>
        </div>
    )
}

export default TemplateCard
