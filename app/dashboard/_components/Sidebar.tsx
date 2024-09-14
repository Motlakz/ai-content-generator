"use client"
import { useEffect } from "react";
import { Home, SettingsIcon, TimerIcon, Wallet2 } from "lucide-react"
import { usePathname } from "next/navigation";
import UsageTrack from "./UsageTrack";
import Link from 'next/link';

const Sidebar = () => {
    const MenuList = [
        {
            name: "Dashboard",
            icon: Home,
            path: "/dashboard"
        },
        {
            name: "History",
            icon: TimerIcon,
            path: "/dashboard/history"
        },
        {
            name: "Billing",
            icon: Wallet2,
            path: "/dashboard/billing"
        },
        {
            name: "Settings",
            icon: SettingsIcon,
            path: "/dashboard/settings"
        },
    ]

    const path = usePathname();
    useEffect(() => {
        console.log(path);
    }, [])
    
    return (
        <div>
            <aside className="h-screen relative p-4 shadow-sm border bg-white">
                <div className="logo flex justify-center border-b-4 border-b-indigo-300">
                    <p className="text-pink-400 pt-3 pb-4">CONTENT <span className="text-blue-400">BLOX</span></p>
                </div>
                <ul className="mt-12">
                    {MenuList.map((menu, index) => (
                        <Link href={menu.path} key={index}>
                            <li className={`flex gap-2 mb-2 p-3 hover:bg-blue-200 transform transition-colors delay-300 rounded-md cursor-pointer ${path === menu.path && "bg-blue-400 text-white hover:bg-blue-500"}`}>
                                <menu.icon />
                                <h2>{menu.name}</h2>
                            </li>
                        </Link>
                    ))}
                </ul>
                <div className="absolute bottom-10 left-0 w-full">
                    <UsageTrack />
                </div>
            </aside>
        </div>
    )
}

export default Sidebar
