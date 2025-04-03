import React, { useState } from 'react'
import Image from './Image'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';

function FeaturedPosts({lineBar=true}) {
    

  return (
    <div className="">
        {lineBar? <div className="w-[50vw] mt-16 h-2 bg-white rounded-3xl mb-20 shadow-blue-600 shadow-md"></div> : ""}

        {lineBar? <h1 className="text-4xl font-bold text-center mb-16">Recent Blogs and Ariticles
            </h1> : ""}
        <div className='lg:px-32 mt-8 flex flex-col lg:flex-row gap-8'>
        
        <div className="w-full lg:w-1/2 flex flex-col gap-2">
        
            <Image src="featured1.jpeg" className="rounded-xl shadow-2xl object-cover"
            
            />
            <div className="flex items-center gap-4">
                <h1 className="font-semibold lg:text-md">01.</h1>
                <Link className='text-blue-800 lg:text-md'>Web Design</Link>
                <span className='text-gray-500'>2 days ago</span>
            </div>
            <Link to="/test"
            className='text-xl lg:text-2xl font-semibold lg:font-bold'>
                Responsive React Login form built with Bootstrap 5.
            </Link>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="lg:h-1/4 flex justify-between gap-4">
                <Image
                    src="featured2.jpeg"
                    className="rounded-xl object-cover w-1/3
                    shadow-2xl aspect-video"
                />
                <div className="w-2/3">
                    <div className="flex items-center gap-4 text-sm lg:text-base mt-6">

                        <h1 className="font-semibold">02.</h1>
                        <Link className='text-blue-800'>
                        Web Design</Link>
                        <span className='text-gray-500 text-sm'>2 days ago</span>
                    </div>
                    <Link to="/test" className='text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl font-medium'>
                    Get 390 react blog website templates on ThemeForest such as </Link>
                </div>
            </div>

            <div className="lg:h-1/4 flex justify-between gap-4">
                <Image
                    src="featured2.jpeg"
                    className="rounded-xl object-cover w-1/3
                    shadow-2xl aspect-video"
                />
                <div className="w-2/3">
                    <div className="flex items-center gap-4 text-sm lg:text-base mt-6">

                        <h1 className="font-semibold">02.</h1>
                        <Link className='text-blue-800'>
                        Web Design</Link>
                        <span className='text-gray-500 text-sm'>2 days ago</span>
                    </div>
                    <Link to="/test" className='text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl font-medium'>
                    Get 390 react blog website templates on ThemeForest such as </Link>
                </div>
            </div>

            <div className="lg:h-1/4 flex justify-between gap-4">
                <Image
                    src="featured2.jpeg"
                    className="rounded-xl object-cover w-1/3
                    shadow-2xl aspect-video"
                />
                <div className="w-2/3">
                    <div className="flex items-center gap-4 text-sm lg:text-base mt-6">

                        <h1 className="font-semibold">02.</h1>
                        <Link className='text-blue-800'>
                        Web Design</Link>
                        <span className='text-gray-500 text-sm'>2 days ago</span>
                    </div>
                    <Link to="/test" className='text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl font-medium'>
                    Get 390 react blog website templates on ThemeForest such as </Link>
                </div>
            </div>
            <div className="w-[50vw] h-2 bg-white rounded-3xl mt-5 shadow-blue-600 shadow-md"></div>
        </div>

    </div>
    </div>
  )
}

export default FeaturedPosts