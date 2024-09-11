"use client"
import { useEffect } from "react";
import { Home, SettingsIcon, TimerIcon, Wallet2 } from "lucide-react"
import { usePathname } from "next/navigation";

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
            <aside className="h-screen p-4 shadow-sm border">
                <div className="logo flex justify-center border-b-4 border-b-indigo-200">
                    <p className="text-pink-400 pt-2 pb-4">CONTENT <span className="text-blue-400">BLOX</span></p>
                </div>
                <ul className="mt-12">
                    {MenuList.map((menu, index) => (
                        <li key={index} className={`flex gap-2 mb-2 p-3 hover:bg-blue-200 transform transition-colors delay-300 rounded-md cursor-pointer ${path === menu.path && "bg-blue-400 text-white hover:bg-blue-500"}`}>
                            <menu.icon />
                            <h2>{menu.name}</h2>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar
