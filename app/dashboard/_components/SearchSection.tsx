import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

const SearchSection = () => {
    return (
        <section className="p-10 flex justify-center flex-col items-center bg-gradient-to-br from-indigo-100 via-pink-100 to-blue-100">
            <article className="text-center mb-4">
                <h2 className="text-3xl font-bold">Browse our collection of templates</h2>
                <p>What would you like to create today?</p>
            </article>
            <div className="inputBox relative bg-white rounded-md max-w-xl w-full">
                <Input 
                    type="search" 
                    placeholder="Browse templates..." 
                    className="pl-10 pr-4 w-full border border-blue-400 outline-none cursor-pointer" 
                />
                <Search className="text-blue-300 rounded-r-md border-r border-blue-300 p-1 absolute top-1/2 transform -translate-y-1/2 text-gray-400 h-8 w-8" />
            </div>
        </section>
    )
}

export default SearchSection
