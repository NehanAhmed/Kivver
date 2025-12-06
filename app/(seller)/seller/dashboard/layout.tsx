'use client'

import React, { Suspense } from 'react'
import { Sidebar } from '../../_components/sidebar';
import { SiteHeader } from '../../_components/site-header';
import NextTopLoader from 'nextjs-toploader';

const layout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>

                <div className="min-h-screen bg-background">
                    {/* Sidebar */}
                    <Sidebar
                        collapsed={sidebarCollapsed}
                        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                    />

                    {/* Site Header */}
                    <SiteHeader sidebarCollapsed={sidebarCollapsed} />
                    <NextTopLoader color="#31aa40"
                        initialPosition={0.08}
                        crawlSpeed={200}
                        height={3}
                        crawl={true}
                        showSpinner={true}
                        easing="ease"
                        speed={200}
                        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                        template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                        zIndex={1600}
                        showAtBottom={false} />

                    {/* Main Content Area */}
                    <main
                        className={`
          pt-16 min-h-screen transition-all duration-300
          ${sidebarCollapsed ? 'ml-20' : 'ml-64'}
        `}
                    >
                        <div className="p-10">
                            {/* Content Placeholder */}
                            {children}
                        </div>
                    </main>
                </div>
            </Suspense>

        </>
    )
}

export default layout