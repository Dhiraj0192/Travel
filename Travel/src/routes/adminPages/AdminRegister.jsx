import { SignUp, useAuth } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Image from '../../components/Image'


function AdminRegisterPage() {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isSignedIn) {
        navigate('/admin-dashboard'); // Redirect to /home after login
      }
    }, [isSignedIn, navigate]);
    const [open , setOpen] = useState(false);
  return (
    <div className="w-full h-screen">
        <div className='sticky top-0 overflow-hidden z-30 bg-black px-6 md:px-32 w-full h-16 md:h-20 flex items-center justify-between'>
        {/* logo */}
        <Link to={`${isSignedIn ? '/home' : '/'}`} className="flex items-center gap-4 text-xl md:text-2xl font-bold">
            <Image src="logo.png" alt="logo" w={32} h={32}/>
            <span className='text-white'>Traveler's Mirror Admin</span>
        </Link>
        
        
    </div>
        
      <div className='w-full lg:px-32'>
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-0  md:mt-0 ">
      <div className='md:mt-5 w-[95vw] md:w-[63%] h-[55vh] md:h-[83vh] flex flex-col justify-center pr-10 md:pt-10 pb-10 pl-10 rounded-3xl'>
                <p className="text-2xl md:text-3xl lg:text-5xl font-bold">Grab control on blog</p>
                <span className='text-2xl md:text-2xl lg:text-5xl font-bold text-blue-800 mt-3'> With The Dashboard</span>
                <p className='mt-10 text-xl text-black md:font-semibold'>Create, publish and connect with readers on our modern blogging platform. Simple to use, powerful to grow your audience.</p>

                <div className="w-[81vw] h-2 bg-blue-800 rounded-3xl md:absolute bottom-10 right-28 mt-3 md:mt-0"></div>
                <div className="w-[70vw] h-2 bg-blue-800 rounded-3xl md:absolute bottom-14 right-28 mt-3 md:mt-0"></div>
                
            </div>
            <div className="mb-10 ml-4 md:mb-0 md:ml-0">
                <SignUp signInUrl='/admin-login'/>
            </div>
        </div>

        
        
        
    </div>
    
    </div>
    
  )
}

export default AdminRegisterPage