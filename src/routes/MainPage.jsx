import React from 'react'
import { Link } from 'react-router-dom'
import MainCategories from '../components/MainCategories'
import PostList from '../components/PostList'
import Footer from '../components/Footer'
import ReadyBlog from '../components/ReadyBlog'
import { FaCheckCircle } from "react-icons/fa";
import Image from '../components/Image'
import FeaturedPosts from '../components/FeaturedPosts'
import BlogHome from '../components/BlogHome'


function MainPage() {
  return (
    <div className=' flex flex-col'>
        <Image src="pexels-fmaderebner-238622.jpg" className="blur-sm w-full h-[65vh] absolute top-0 -z-10"/>
        {/* breadcrumb */}
        <div className="h-96 flex flex-col justify-center">
        <div className="flex gap-4 lg:px-32 text-white ">
            <Link to="/home" className='text-xl'>Home</Link>
            <span className='text-xl text-white'>.</span>
            <span className='text-white text-xl'>Blogs and Articles</span>
        </div>
        {/* introduction */}
        <div className="lg:px-32 flex items-center justify-between">
            <div className=" w-[60vw]">
                <h1 className="text-white text-2xl md:text-5xl lg:text-5xl font-bold">Share your content, engage with readers, and grow audience.</h1>
                <p className="mt-8 text-md md:text-xl text-white">Our intuitive editor makes it easy to express yourself with text, images, and multimedia.</p>

            </div>
            <Link to="write" className='hidden md:block relative'></Link>
            <svg
            viewBox='0 0 200 200'
            width="170"
            height="200"
            className='text-lg tracking-widest animate-spin animatedButton mr-3 text'
            >
                <path
                    id='circlePath'
                    d='M 100, 100 m -75, 0 a 75,75 0 1, 1 150,0 a 75, 75 0 1,1 -150,0'
                    fill='none'
                />
                <text>
                    <textPath href='#circlePath' startOffset="0%" >
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
        </div>

        <div className="mt-16 mb-16 flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold text-blue-800">Tranding Blogs</h1>
      <p className="text-gray-600">
        Discover trending content from our community of writers
      </p>
        </div>

        {/* first */}

        <div className="lg:px-32 flex items-center justify-between gap-8">
        <div className="rounded-3xl w-[33%] flex flex-col gap-3 bg-gray-200 shadow-lg">
          <Image src="featured1.jpeg" className="rounded-3xl object-cover" />
          <div className="p-4 flex flex-col items-start justify-center gap-3">
            <p className="text-blue-800 font-bold text-2xl">
              The Power of Deep Work in a Distracted World
            </p>
            <p className="text-gray-600">
              Learn how to achieve focused work and accomplish more in less time
              with proven concentration techniques.
            </p>
            <div className="flex items-center justify-start gap-4">
              <Image
                src="featured1.jpeg"
                className="rounded-full object-cover w-8 h-8"
              />
              <div className="flex flex-col ">
                <p className="font-bold text-black">Alex Chen</p>
                <p className="text-gray-600">Posted on April 28,2025</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-green-600 text-lg font-bold">Read More --</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl w-[33%] flex flex-col gap-3 bg-gray-200 shadow-lg">
          <Image src="featured1.jpeg" className="rounded-3xl object-cover" />
          <div className="p-4 flex flex-col items-start justify-center gap-3">
            <p className="text-blue-800 font-bold text-2xl">
              The Power of Deep Work in a Distracted World
            </p>
            <p className="text-gray-600">
              Learn how to achieve focused work and accomplish more in less time
              with proven concentration techniques.
            </p>
            <div className="flex items-center justify-start gap-4">
              <Image
                src="featured1.jpeg"
                className="rounded-full object-cover w-8 h-8"
              />
              <div className="flex flex-col ">
                <p className="font-bold text-black">Alex Chen</p>
                <p className="text-gray-600">Posted on April 28,2025</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-green-600 text-lg font-bold">Read More --</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl w-[33%] flex flex-col gap-3 bg-gray-200 shadow-lg">
          <Image src="featured1.jpeg" className="rounded-3xl object-cover" />
          <div className="p-4 flex flex-col items-start justify-center gap-3">
            <p className="text-blue-800 font-bold text-2xl">
              The Power of Deep Work in a Distracted World
            </p>
            <p className="text-gray-600">
              Learn how to achieve focused work and accomplish more in less time
              with proven concentration techniques.
            </p>
            <div className="flex items-center justify-start gap-4">
              <Image
                src="featured1.jpeg"
                className="rounded-full object-cover w-8 h-8"
              />
              <div className="flex flex-col ">
                <p className="font-bold text-black">Alex Chen</p>
                <p className="text-gray-600">Posted on April 28,2025</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-green-600 text-lg font-bold">Read More --</p>
            </div>
          </div>
        </div>
      </div>

      {/* second */}


      <div className="mt-10 mb-10 lg:px-32 flex items-center justify-between gap-8">
        <div className="rounded-3xl w-[33%] flex flex-col gap-3 bg-gray-200 shadow-lg">
          <Image src="featured1.jpeg" className="rounded-3xl object-cover" />
          <div className="p-4 flex flex-col items-start justify-center gap-3">
            <p className="text-blue-800 font-bold text-2xl">
              The Power of Deep Work in a Distracted World
            </p>
            <p className="text-gray-600">
              Learn how to achieve focused work and accomplish more in less time
              with proven concentration techniques.
            </p>
            <div className="flex items-center justify-start gap-4">
              <Image
                src="featured1.jpeg"
                className="rounded-full object-cover w-8 h-8"
              />
              <div className="flex flex-col ">
                <p className="font-bold text-black">Alex Chen</p>
                <p className="text-gray-600">Posted on April 28,2025</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-green-600 text-lg font-bold">Read More --</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl w-[33%] flex flex-col gap-3 bg-gray-200 shadow-lg">
          <Image src="featured1.jpeg" className="rounded-3xl object-cover" />
          <div className="p-4 flex flex-col items-start justify-center gap-3">
            <p className="text-blue-800 font-bold text-2xl">
              The Power of Deep Work in a Distracted World
            </p>
            <p className="text-gray-600">
              Learn how to achieve focused work and accomplish more in less time
              with proven concentration techniques.
            </p>
            <div className="flex items-center justify-start gap-4">
              <Image
                src="featured1.jpeg"
                className="rounded-full object-cover w-8 h-8"
              />
              <div className="flex flex-col ">
                <p className="font-bold text-black">Alex Chen</p>
                <p className="text-gray-600">Posted on April 28,2025</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-green-600 text-lg font-bold">Read More --</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl w-[33%] flex flex-col gap-3 bg-gray-200 shadow-lg">
          <Image src="featured1.jpeg" className="rounded-3xl object-cover" />
          <div className="p-4 flex flex-col items-start justify-center gap-3">
            <p className="text-blue-800 font-bold text-2xl">
              The Power of Deep Work in a Distracted World
            </p>
            <p className="text-gray-600">
              Learn how to achieve focused work and accomplish more in less time
              with proven concentration techniques.
            </p>
            <div className="flex items-center justify-start gap-4">
              <Image
                src="featured1.jpeg"
                className="rounded-full object-cover w-8 h-8"
              />
              <div className="flex flex-col ">
                <p className="font-bold text-black">Alex Chen</p>
                <p className="text-gray-600">Posted on April 28,2025</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-green-600 text-lg font-bold">Read More --</p>
            </div>
          </div>
        </div>
      </div>

      {/* third */}


      <div className="lg:px-32 flex items-center justify-between gap-8">
        <div className="rounded-3xl w-[33%] flex flex-col gap-3 bg-gray-200 shadow-lg">
          <Image src="featured1.jpeg" className="rounded-3xl object-cover" />
          <div className="p-4 flex flex-col items-start justify-center gap-3">
            <p className="text-blue-800 font-bold text-2xl">
              The Power of Deep Work in a Distracted World
            </p>
            <p className="text-gray-600">
              Learn how to achieve focused work and accomplish more in less time
              with proven concentration techniques.
            </p>
            <div className="flex items-center justify-start gap-4">
              <Image
                src="featured1.jpeg"
                className="rounded-full object-cover w-8 h-8"
              />
              <div className="flex flex-col ">
                <p className="font-bold text-black">Alex Chen</p>
                <p className="text-gray-600">Posted on April 28,2025</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-green-600 text-lg font-bold">Read More --</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl w-[33%] flex flex-col gap-3 bg-gray-200 shadow-lg">
          <Image src="featured1.jpeg" className="rounded-3xl object-cover" />
          <div className="p-4 flex flex-col items-start justify-center gap-3">
            <p className="text-blue-800 font-bold text-2xl">
              The Power of Deep Work in a Distracted World
            </p>
            <p className="text-gray-600">
              Learn how to achieve focused work and accomplish more in less time
              with proven concentration techniques.
            </p>
            <div className="flex items-center justify-start gap-4">
              <Image
                src="featured1.jpeg"
                className="rounded-full object-cover w-8 h-8"
              />
              <div className="flex flex-col ">
                <p className="font-bold text-black">Alex Chen</p>
                <p className="text-gray-600">Posted on April 28,2025</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-green-600 text-lg font-bold">Read More --</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl w-[33%] flex flex-col gap-3 bg-gray-200 shadow-lg">
          <Image src="featured1.jpeg" className="rounded-3xl object-cover" />
          <div className="p-4 flex flex-col items-start justify-center gap-3">
            <p className="text-blue-800 font-bold text-2xl">
              The Power of Deep Work in a Distracted World
            </p>
            <p className="text-gray-600">
              Learn how to achieve focused work and accomplish more in less time
              with proven concentration techniques.
            </p>
            <div className="flex items-center justify-start gap-4">
              <Image
                src="featured1.jpeg"
                className="rounded-full object-cover w-8 h-8"
              />
              <div className="flex flex-col ">
                <p className="font-bold text-black">Alex Chen</p>
                <p className="text-gray-600">Posted on April 28,2025</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-green-600 text-lg font-bold">Read More --</p>
            </div>
          </div>
        </div>
      </div>


        <div className="lg:px-32">
          <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-xl items-center justify-center gap-8 mt-10">
                  <div className="flex-1 flex items-center justify-between flex-wrap">
                    <Link
                      to="/posts"
                      className="bg-blue-800 text-white rounded-full px-4 py-2"
                    >
                      All Categories
                    </Link>
                    <Link
                      to="/posts?cat=web-design"
                      className="hover:bg-blue-50 rounded-full px-4 py-2"
                    >
                      Adventure
                    </Link>
                    <Link
                      to="/posts?cat=development"
                      className="hover:bg-blue-50 rounded-full px-4 py-2"
                    >
                      Luxury
                    </Link>
                    <Link
                      to="/posts?cat=databases"
                      className="hover:bg-blue-50 rounded-full px-4 py-2"
                    >
                      Solo Travel
                    </Link>
                    <Link
                      to="/posts?cat=databases"
                      className="hover:bg-blue-50 rounded-full px-4 py-2"
                    >
                      Budget Travel
                    </Link>
                    <Link
                      to="/posts?cat=seo"
                      className="hover:bg-blue-50 rounded-full px-4 py-2"
                    >
                      Marketing
                    </Link>
                  </div>
                  <span className="text-xl font-medium">|</span>
          
                  <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="gray"
                    >
                      <circle cx="10.5" cy="10.5" r="7.5" />
                      <line x1="16.5" y1="16.5" x2="22" y2="22" />
                    </svg>
                    <input
                      type="text"
                      placeholder="search a post..."
                      className="bg-transparent"
                    />
                  </div>
                </div>
        </div>

        <div className="mt-10">
        <FeaturedPosts lineBar={false} />
        </div>

        <BlogHome/>
        

        <Footer/>
    </div>
  )
}

export default MainPage