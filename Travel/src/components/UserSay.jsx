import React from 'react'
import { MdMessage } from "react-icons/md";
import Image from './Image';

function UserSay() {
  return (
    <div className='bg-[url(public/346596-PAQ0SL-281.jpg)] bg-cover bg-no-repeat pb-10 pt-10 '>
        

        <div className="lg:px-32 mt-10 mb-10">

        <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold">What Our Users Say
            </h1>
            <p className="text-gray-600 text-lg">
            Real stories from bloggers who transformed their online presence
            </p>
            <div className="mt-5 flex items-center justify-between gap-4">
                <div className="w-[33%] rounded-2xl p-6 bg-gray-600 flex flex-col items-start gap-5">
                    <MdMessage className='w-10 h-10 text-green-400'/>

                    <p className="italic text-white">
                    "This platform made blogging accessible to me. The Google sign-in process was seamless, and I published my first article in minutes. Now I have over 5,000 monthly readers!"
                    </p>
                    <div className="flex items-center justify-start gap-3">
                        <div className="rounded-full">
                        <Image
                    src="featured2.jpeg"
                    className=" object-cover aspect-video
                    rounded-full
                    w-12
                    h-12
                    "
                    
                />
                        </div>

                        <div className="flex flex-col items-start gap-1">
                            <p className="font-bold text-white">Dhiraj Yadav</p>
                            <p className="text-white">
                                Travel Blogger
                            </p>
                        </div>

                    </div>
                </div>

                <div className="w-[33%] rounded-2xl p-6 bg-gray-600 flex flex-col items-start gap-5">
                    <MdMessage className='w-10 h-10 text-green-400'/>

                    <p className="italic text-white">
                    "This platform made blogging accessible to me. The Google sign-in process was seamless, and I published my first article in minutes. Now I have over 5,000 monthly readers!"
                    </p>
                    <div className="flex items-center justify-start gap-3">
                        <div className="rounded-full">
                        <Image
                    src="featured2.jpeg"
                    className=" object-cover aspect-video
                    rounded-full
                    w-12
                    h-12
                    "
                    
                />
                        </div>

                        <div className="flex flex-col items-start gap-1">
                            <p className="font-bold text-white">Dhiraj Yadav</p>
                            <p className="text-white">
                                Travel Blogger
                            </p>
                        </div>

                    </div>
                </div>

                <div className="w-[33%] rounded-2xl p-6 bg-gray-600 flex flex-col items-start gap-5">
                    <MdMessage className='w-10 h-10 text-green-400'/>

                    <p className="italic text-white">
                    "This platform made blogging accessible to me. The Google sign-in process was seamless, and I published my first article in minutes. Now I have over 5,000 monthly readers!"
                    </p>
                    <div className="flex items-center justify-start gap-3">
                        <div className="rounded-full">
                        <Image
                    src="featured2.jpeg"
                    className=" object-cover aspect-video
                    rounded-full
                    w-12
                    h-12
                    "
                    
                />
                        </div>

                        <div className="flex flex-col items-start gap-1">
                            <p className="font-bold text-white">Dhiraj Yadav</p>
                            <p className="text-white">
                                Travel Blogger
                            </p>
                        </div>

                    </div>
                </div>

                
            </div>

            
        </div>
        </div>
        

    </div>
  )
}

export default UserSay