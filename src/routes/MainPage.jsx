import React from 'react'
import { Link } from 'react-router-dom'
import MainCategories from '../components/MainCategories'
import PostList from '../components/PostList'
import Footer from '../components/Footer'
import ReadyBlog from '../components/ReadyBlog'
import { FaCheckCircle } from "react-icons/fa";

function MainPage() {
  return (
    <div className='mt-4 flex flex-col'>
        {/* breadcrumb */}
        <div className="flex gap-4">
            <Link to="/home">Home</Link>
            <span>.</span>
            <span className='text-blue-800'>Blogs and Articles</span>
        </div>
        {/* introduction */}
        <div className="flex items-center justify-between">
            <div className=" w-[60vw]">
                <h1 className="text-gray-800 text-2xl md:text-5xl lg:text-5xl font-bold">Share your content, engage with readers, and grow audience.</h1>
                <p className="mt-8 text-md md:text-xl">Our intuitive editor makes it easy to express yourself with text, images, and multimedia.</p>

            </div>
            <Link to="write" className='hidden md:block relative'></Link>
            <svg
            viewBox='0 0 200 200'
            width="170"
            height="200"
            className='text-lg tracking-widest animate-spin animatedButton mr-3'
            >
                <path
                    id='circlePath'
                    d='M 100, 100 m -75, 0 a 75,75 0 1, 1 150,0 a 75, 75 0 1,1 -150,0'
                    fill='none'
                />
                <text>
                    <textPath href='#circlePath' startOffset="0%">
                        Write your story .
                    </textPath>
                    <textPath href='#circlePath' startOffset="50%">
                        Share your idea .
                    </textPath>
                </text>
            </svg>
            <button className="absolute top-50 right-40 w-24 h-24 bg-blue-800 rounded-full flex items-center justify-center">
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width="50"
                    height="50"
                    fill='none'
                    stroke='white'
                    strokeWidth="2"
                >
                    <line x1="6" y1="18" x2="18" y2="6" />
                    <polyline points='9 6 18 6 18 15' />

                </svg>
            </button>
        </div>

        <MainCategories />

        <PostList/>

        

        {/* join community */}
        
              <div className="mt-16 w-full rounded-3xl p-8 bg-gray-200 flex items-center justify-between gap-4">
                <div className="flex flex-col justify-start gap-4">
                  <h1 className="text-3xl font-bold text-blue-800">
                    Join Our Writing Community
                  </h1>
                  <p className="text-black">
                    Connect with other bloggers, share ideas, and get inspired. Our
                    community helps you grow as a writer.
                  </p>
                  <div className="flex items-center">
                    <FaCheckCircle className="w-4 h-4" />
                    <p className="ml-5 text-black">Weekly writing prompts</p>
                  </div>
                  <div className="flex items-center">
                    <FaCheckCircle className="w-4 h-4" />
                    <p className="ml-5 text-black">Feedback from experienced writers</p>
                  </div>
                  <div className="flex items-center">
                    <FaCheckCircle className="w-4 h-4" />
                    <p className="ml-5 text-black">Networking opportunities</p>
                  </div>
                </div>
        
                <div className="flex flex-col bg-gray-300 rounded-3xl p-6 gap-4 shadow-blue-300 shadow-lg">
                    <p className="text-black">+2,500 members</p>
                    <p className="text-gray-600">"Joining this community transformed my writing and helped me find my audience. Now I'm a full-time blogger!"</p>
                    <div className="flex items-center justify-start gap-2">
                        <div className="rounded-full w-10 h-10 bg-blue-700"></div>
                        <div className="flex flex-col justify-start">
                            <p className="text-black font-bold">Dhiraj Yadav</p>
                            <p className="text-gray-600">Main Developer</p>
                        </div>
                    </div>
                </div>
              </div>
        

        <Footer/>
    </div>
  )
}

export default MainPage