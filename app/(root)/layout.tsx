import React from 'react'
import Header from './_components/Header'
import { Footer } from './_components/Footer'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='min-h-screen w-full bg-white  bg-gradient-to-b from-green-50 to-white'>
            <Header />
            {children}
            <Footer />
        </main>
    )
}

export default layout