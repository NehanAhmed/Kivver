import React, { Suspense } from 'react'
import Header from './_components/Header'
import { Footer } from './_components/Footer'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='min-h-screen w-full bg-white bg-gradient-to-b from-green-50 to-white'>
            <Header />
            <Suspense fallback={
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                </div>
            }>
                {children}
            </Suspense>
            <Footer />
        </main>
    )
}

export default layout