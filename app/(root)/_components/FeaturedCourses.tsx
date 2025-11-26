import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FeaturedCourses = () => {
    return (
        <section className='glass-effect w-full max-h-1/2 py-20  px-10 flex flex-col gap-10  bg-white  items-start justify-center'>
            <div>
                <h1 className='text-4xl text-green-400 font-semibold'>Featured Courses</h1>
            </div>
            <div>
                <div>
                    <Card className='w-md h-2xl  rounded-lg shadow-sm'>
                        <CardHeader>
                            <img src='https://images.unsplash.com/photo-1542810634-71277d95dcbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBsZWFybmluZ3xlbnwxfHx8fDE3NjQwMDIyNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' alt='Imge' width={400} height={100} />
                        </CardHeader>
                        <CardContent>
                            <Link href='#' className='transition-colors duration-200  inline-block hover:translate-x-1 transition-transform text-xl font-semibold'>Hello</Link>
                            <p>This is something.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default FeaturedCourses