import React from 'react'
import Image from './Image'

function PopularCategories() {
  return (
    <div className='lg:px-32 w-full flex flex-col mt-4 md:mt-16 mb-16'>
        <div className="flex  items-center justify-between">
            <div className="md:w-[28vw] h-1 bg-gray-300"></div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
                Popular Categories
            </h1>
            <div className="w-[28vw] h-1 bg-gray-300"></div>
        </div>

        <div className="mt-16">
        <div className="flex md:flex-row flex-col items-center justify-between gap-6">
                <div className="flex-col items-center gap-4">
                <img
                    src="bucketlist.jpg"
                    className="rounded-xl object-cover 
                    shadow-2xl w-[80vw]"
                    
                />
                <p className="text-black capitalize text-xl md:text-2xl font-semibold text-center mt-3">Bucket List</p>
                </div>

                <div className="flex-col items-center gap-4">
                <img
                    src="budgettravel.jpg"
                    className="rounded-xl object-cover 
                    shadow-2xl w-[80vw]"
                    
                />
                <p className="text-black capitalize text-xl md:text-2xl font-semibold text-center mt-3">Budget Travel</p>
                </div>


                <div className="flex-col items-center justify-center gap-4">
                <img
                    src="hikes.jpg"
                    className="rounded-xl object-cover 
                    shadow-2xl w-[80vw]"
                    
                />
                <p className="text-black capitalize text-xl md:text-2xl font-semibold text-center mt-3">Hikes</p>
                </div>

            </div>

            <div className="flex md:flex-row flex-col items-center justify-between gap-6 mt-14">
                <div className="flex-col items-center gap-4">
                <img
                    src="adventure.jpg"
                    className="rounded-xl object-cover 
                    shadow-2xl w-[80vw]"
                    
                />
                <p className="text-black capitalize text-xl md:text-2xl font-semibold text-center mt-3">Adventure</p>
                </div>

                <div className="flex-col items-center gap-4">
                <img
                    src="luxurytravel.jpg"
                    className="rounded-xl object-cover 
                    shadow-2xl w-[80vw]"
                    
                />
                <p className="text-black capitalize text-xl md:text-2xl font-semibold text-center mt-3">Luxury</p>
                </div>


                <div className="flex-col items-center justify-center gap-4">
                <img
                    src="solotravel.jpg"
                    className="rounded-xl object-cover 
                    shadow-2xl w-[80vw]"
                    
                />
                <p className="text-black capitalize text-xl md:text-2xl font-semibold text-center mt-3">Solo Travel</p>
                </div>

            </div>
        </div>


    </div>
  )
}

export default PopularCategories