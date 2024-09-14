"use client"

import React, { useState } from 'react'
import Sidebar from './_components/Sidebar';
import Header from './_components/Header';
import { TotalUsageContext } from '../(context)/TotalUsageContext';
import { SubscriptionProvider } from '../(context)/SubscriptionContext';

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

    const [totalUsage, setTotalUsage] = useState<number>(0)
    return (
        <SubscriptionProvider>
            <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
                <div className="bg-slate-50 min-h-screen">
                    <div className="md:w-64 hidden md:block fixed">
                        <Sidebar />
                    </div>
                    <div className="md:ml-64">
                        <Header />
                        {children}
                    </div>
                </div>
            </TotalUsageContext.Provider>
        </SubscriptionProvider>
    )
}

export default Layout
