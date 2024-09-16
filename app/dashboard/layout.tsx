"use client"

import React, { useState, useEffect } from 'react'
import Sidebar from './_components/Sidebar';
import Header from './_components/Header';
import { TotalUsageContext } from '../(context)/TotalUsageContext';
import { SubscriptionProvider } from '../(context)/SubscriptionContext';
import { NotificationProvider } from '../(context)/NotificationContext';

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

    const [totalUsage, setTotalUsage] = useState<number>(0)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
        checkIfMobile()
        window.addEventListener('resize', checkIfMobile)
        return () => window.removeEventListener('resize', checkIfMobile)
    }, [])

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <NotificationProvider>
            <SubscriptionProvider>
                <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
                    <div className="bg-slate-50 min-h-screen relative">
                        {/* Overlay */}
                        {sidebarOpen && isMobile && (
                            <div 
                                className="fixed inset-0 bg-black bg-opacity-50 z-30"
                                onClick={() => setSidebarOpen(false)}
                            ></div>
                        )}
                        
                        {/* Sidebar */}
                        <div 
                            className={`fixed top-0 left-0 h-full w-64 z-40 transition-transform duration-300 ease-in-out transform ${
                                sidebarOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'
                            } md:translate-x-0`}
                        >
                            <Sidebar onClose={() => setSidebarOpen(false)} />
                        </div>
                        
                        {/* Main Content */}
                        <div className="md:ml-64">
                            <Header toggleSidebar={toggleSidebar} />
                            <main>
                                {children}
                            </main>
                        </div>
                    </div>
                </TotalUsageContext.Provider>
            </SubscriptionProvider>
        </NotificationProvider>
    )
}

export default Layout
