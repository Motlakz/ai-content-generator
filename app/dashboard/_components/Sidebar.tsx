"use client"

import { useEffect } from "react";
import { Bell, Home, SettingsIcon, TimerIcon, Wallet2, X } from "lucide-react"
import { usePathname } from "next/navigation";
import UsageTrack from "./UsageTrack";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useNotification } from "@/app/(context)/NotificationContext";

interface SidebarProps {
    onClose: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
    const { notificationCount } = useNotification();

    const MenuList = [
        {
            name: "Dashboard",
            icon: Home,
            path: "/dashboard"
        },
        {
            name: "Notifications",
            icon: Bell,
            path: "/dashboard/notifications",
            hasNotification: notificationCount > 0 // Check if there are notifications
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

    return (
        <div className="h-screen flex flex-col">
            <aside className="flex-grow p-4 shadow-sm border bg-white">
                <div className="logo flex justify-between items-center border-b-4 border-b-indigo-300">
                    <p className="text-pink-400 pt-3 pb-4">CONTENT <span className="text-blue-400">BLOX</span></p>
                    <Button variant="ghost" onClick={onClose} className="md:hidden bg-blue-200 hover:bg-blue-100 rounded-md">
                        <X />
                    </Button>
                </div>
                <ul className="mt-12">
                    {MenuList.map((menu, index) => (
                        <Link href={menu.path} key={index}>
                            <li className={`flex relative gap-2 mb-2 p-3 hover:bg-blue-200 transform transition-colors delay-300 rounded-md cursor-pointer ${path === menu.path && "bg-blue-400 text-white hover:bg-blue-500"}`}>
                                {menu.hasNotification && <span className="ml-2 w-4 h-4 absolute top-0 left-0 bg-red-500 rounded-full animate-pulse" />}
                                
                                <menu.icon />
                                <h2>{menu.name}</h2>
                            </li>
                        </Link>
                    ))}
                </ul>
            </aside>
            <div className="bg-white border-t">
                <UsageTrack />
            </div>
        </div>
    )
}

export default Sidebar;
