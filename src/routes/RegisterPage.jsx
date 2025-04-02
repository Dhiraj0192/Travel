import { SignUp } from '@clerk/clerk-react'
import React from 'react'
import Footer from '../components/Footer'

function RegisterPage() {
  return (
    <div className="w-full h-screen">
      <div className='w-full lg:px-32'>
        <div className="flex items-center justify-between gap-0">
            <div className='mt-0 w-[63%] h-[84vh] flex flex-col justify-end pr-10 pt-10 pb-40 pl-10 rounded-3xl '>
                <p className="text-7xl font-bold">Share Your Story</p>
                <span className='text-6xl font-bold text-blue-800 mt-5'> With The World</span>
                <p className='mt-10 text-xl text-black font-semibold'>Create, publish and connect with readers on our modern blogging platform. Simple to use, powerful to grow your audience.</p>

                <div className="w-[81vw] h-2 bg-blue-800 rounded-3xl absolute top-44 right-28"></div>
                <div className="w-[70vw] h-2 bg-blue-800 rounded-3xl absolute top-40 right-28"></div>
                <div className="w-[61vw] h-2 bg-blue-800 rounded-3xl absolute top-36 right-28"></div>
            </div>
            <div className="pt-10 pb-10">
                <SignUp signInUrl='/login'/>
            </div>
        </div>

        
        
        
    </div>
    <Footer/>
    </div>
    
  )
}

export default RegisterPage