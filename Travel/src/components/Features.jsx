import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { SiCkeditor4 } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa6";
import { SiLibreofficewriter } from "react-icons/si";
import { MdMessage } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";

function Features() {
  return (
    <div className='lg:px-32 mt-20 mb-10'>
        <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-4xl font-bold">Powerful Features For Modern Bloggers
            </h1>
            <p className="text-gray-600 text-lg">
            Everything you need to create, manage, and grow your blog in one place
            </p>

            <div className="flex items-center justify-between gap-5 mt-5">
                <div className="bg-gray-100 p-8 rounded-2xl flex flex-col gap-4 w-[33%]">

                <SiCkeditor4 className='w-8 h-8' />
                
                <h2 className="text-blue-800 text-2xl font-bold">Intuitive Editor</h2>
                <p className="text-black ">A clean, distraction-free writing experience with rich formatting options and real-time preview</p>
                </div>
                <div className="bg-gray-100 p-8 rounded-2xl flex flex-col gap-4 w-[33%]">
                <FcGoogle className='w-8 h-8'/>
                
                <h2 className="text-blue-800 text-2xl font-bold">Google Integration</h2>
                <p className="text-black ">A One-click sign-in with Google for secure authentication and seamless access to your blog hub.</p>
                </div>
                <div className="bg-gray-100 p-8 rounded-2xl flex flex-col gap-4 w-[33%]">
                <FaEye className='w-8 h-8' />
                
                <h2 className="text-blue-800 text-2xl font-bold">SEO Optimization</h2>
                <p className="text-black ">A Built-in tools to help your content rank higher on search engines and reach a wider audience.</p>
                </div>
            </div>

            <div className="flex items-center justify-between gap-5 mt-5">
                <div className="bg-gray-100 p-8 rounded-2xl flex flex-col gap-4 w-[33%]">
                <SiLibreofficewriter className='w-8 h-8'/>
                
                
                <h2 className="text-blue-800 text-2xl font-bold">Write your own</h2>
                <p className="text-black ">Write your own blog with detailed insights on readership, engagement, and content popularity.</p>
                </div>
                <div className="bg-gray-100 p-8 rounded-2xl flex flex-col gap-4 w-[33%]">
                <MdMessage className='w-8 h-8'/>
                
                <h2 className="text-blue-800 text-2xl font-bold">Community Engagement</h2>
                <p className="text-black ">Built-in commenting system with moderation tools to foster meaningful conversations with your readers.</p>
                </div>
                <div className="bg-gray-100 p-8 rounded-2xl flex flex-col gap-4 w-[33%]">
                <FaMobileAlt className='w-8 h-8'/>
                
                <h2 className="text-blue-800 text-2xl font-bold">Mobile Responsive</h2>
                <p className="text-black ">Your blog looks stunning on every device with our mobile-first design approach and adaptive layouts.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Features