import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, StarIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <nav className="flex items-center justify-between p-4 bg-white shadow-lg w-full">
            <div className="inputBox relative">
                <Input 
                    type="search" 
                    placeholder="Search..." 
                    className="pl-10 pr-4 max-w-md w-full border border-blue-400 outline-none cursor-pointer" 
                />
                <Search className="rounded-r-md border-r border-blue-300 p-1 absolute top-1/2 transform -translate-y-1/2 text-gray-400 h-8 w-8" />
            </div>
            <Button asChild variant="default" className="bg-indigo-600 hover:bg-indigo-700 rounded-lg">
                <Link href="/dashboard/billing">
                    Upgrade <StarIcon className="ml-3 fill-blue-300 text-white" />
                </Link>
            </Button>
        </nav>
    )
}

export default Header
