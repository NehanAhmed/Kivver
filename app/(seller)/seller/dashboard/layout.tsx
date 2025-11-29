'use client'

import React from 'react'
import { Sidebar } from '../../_components/sidebar';
import { SiteHeader } from '../../_components/site-header';

const layout = ({ children }: { children: React.ReactNode }) => {
      const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar */}
            <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Site Header */}
            <SiteHeader sidebarCollapsed={sidebarCollapsed} />

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
    )
}

export default layout