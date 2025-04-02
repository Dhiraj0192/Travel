import { SignIn } from '@clerk/clerk-react'
import React from 'react'
import Footer from '../components/Footer'

function LoginPage() {
  return (
    
    <div className="w-full h-screen">
      <div className='w-full lg:px-32'>
        <div className="flex items-center justify-between gap-0">
            <div className='mt-5 w-[63%]  h-[83vh] flex flex-col justify-center pr-10 pt-10 pb-10 pl-10 rounded-3xl'>
                <p className="text-7xl font-bold">Share Your Story</p>
                <span className='text-6xl font-bold text-blue-800 mt-5'> With The World</span>
                <p className='mt-10 text-xl text-black font-semibold'>Create, publish and connect with readers on our modern blogging platform. Simple to use, powerful to grow your audience.</p>

                <div className="w-[81vw] h-2 bg-blue-800 rounded-3xl absolute bottom-10 right-28"></div>
                <div className="w-[70vw] h-2 bg-blue-800 rounded-3xl absolute bottom-14 right-28"></div>
                
            </div>
            <div className="">
                <SignIn signUpUrl='/register'/>
            </div>
        </div>

        
        
        
    </div>
      <Footer/>
    </div>
  )
}

export default LoginPage