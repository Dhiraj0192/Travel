import React from 'react'
import Image from './Image'

function Destination() {
  return (
    <div className='lg:px-32 mt-10 lg:mt-20 px-8'>
        <div className="flex flex-col items-center gap-8">
        <h1 className="text-2xl lg:text-4xl font-bold">Featured Destination
            </h1>
            <p className="text-gray-600 text-sm text-center  lg:text-lg">
            Everything you need to create, manage, and grow your blog in one place
            </p>

            <div className="flex flex-col md:flex-row  items-center justify-between gap-6">
                <div className="flex-col items-center gap-4">
                <Image
                    src="featured2.jpeg"
                    className="rounded-xl object-cover 
                    shadow-2xl aspect-video"
                    
                />
                <p className="text-black capitalize text-xl lg:text-2xl font-semibold text-center mt-3">travel blog</p>
                </div>

                <div className="flex-col items-center gap-4">
                <Image
                    src="featured1.jpeg"
                    className="rounded-xl object-cover
                    shadow-2xl  aspect-video"
                />
                <p className="text-black capitalize text-xl lg:text-2xl font-semibold text-center mt-3">destination blog</p>
                </div>


                <div className="flex-col items-center justify-center gap-4">
                <Image
                    src="featured2.jpeg"
                    className="rounded-xl object-cover
                    shadow-2xl  aspect-video"
                />
                <p className="text-black capitalize text-xl lg:text-2xl font-semibold text-center mt-3">travel blog</p>
                </div>

            </div>


            <div className="flex flex-col md:flex-row  items-center justify-between gap-6">
                <div className="flex-col items-center gap-4">
                <Image
                    src="featured2.jpeg"
                    className="rounded-xl object-cover 
                    shadow-2xl aspect-video"
                    
                />
                <p className="text-black capitalize text-xl lg:text-2xl font-semibold text-center mt-3">travel blog</p>
                </div>

                <div className="flex-col items-center gap-4">
                <Image
                    src="featured1.jpeg"
                    className="rounded-xl object-cover
                    shadow-2xl  aspect-video"
                />
                <p className="text-black capitalize text-xl lg:text-2xl font-semibold text-center mt-3">destination blog</p>
                </div>


                <div className="flex-col items-center justify-center gap-4">
                <Image
                    src="featured2.jpeg"
                    className="rounded-xl object-cover
                    shadow-2xl  aspect-video"
                />
                <p className="text-black capitalize text-xl lg:text-2xl font-semibold text-center mt-3">travel blog</p>
                </div>

            </div>
            
        </div>

    </div>
  )
}

export default Destination