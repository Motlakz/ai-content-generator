import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserButton } from '@clerk/nextjs'
import { Search, StarIcon, Menu } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface HeaderProps {
    toggleSidebar: () => void
}
const Header = ({ toggleSidebar }: HeaderProps) => {
    return (
        <nav className="flex flex-col md:flex-row items-center justify-between p-4 bg-white shadow-lg w-full">
            <div className="flex items-center w-full md:w-auto">
                <Button 
                    onClick={toggleSidebar} 
                    variant="ghost" 
                    className="mr-2 md:hidden rounded-md hover:bg-blue-100 bg-blue-200"
                    size="icon"
                >
                    <Menu className="h-6 w-6" />
                </Button>
                <div className="inputBox relative w-full md:max-w-md">
                    <Input 
                        type="search" 
                        placeholder="Search..." 
                        className="pl-10 pr-4 w-full border border-blue-400 outline-none cursor-pointer" 
                    />
                    <Search className="rounded-r-md border-r border-blue-300 p-1 absolute top-1/2 transform -translate-y-1/2 text-gray-400 h-8 w-8" />
                </div>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
                <Button asChild variant="default" className="bg-indigo-600 hover:bg-indigo-700 rounded-lg">
                    <Link href="/dashboard/billing">
                        Upgrade <StarIcon className="ml-3 fill-blue-300 text-white" />
                    </Link>
                </Button>
                <UserButton />
            </div>
        </nav>
    )
}

export default Header
