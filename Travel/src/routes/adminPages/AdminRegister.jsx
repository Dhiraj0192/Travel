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
        <div className='sticky top-0 overflow-hidden z-30 bg-black px-32 w-full h-16 md:h-20 flex items-center justify-between'>
        {/* logo */}
        <Link to={`${isSignedIn ? '/home' : '/'}`} className="flex items-center gap-4 text-2xl font-bold">
            <Image src="logo.png" alt="logo" w={32} h={32}/>
            <span className='text-white'>Traveller's Mirror Admin</span>
        </Link>
        </div>
        
      <div className='w-full lg:px-32'>
        <div className="flex items-center justify-between gap-0">
            <div className='mt-0 w-[63%] h-[84vh] flex flex-col justify-end pr-10 pt-10 pb-40 pl-10 rounded-3xl '>
                <p className="text-7xl font-bold">Grab control on blog</p>
                <span className='text-6xl font-bold text-blue-800 mt-5'> With The Dashboard</span>
                <p className='mt-10 text-xl text-black font-semibold'>Create, publish and connect with readers on our modern blogging platform. Simple to use, powerful to grow your audience.</p>

                <div className="w-[81vw] h-2 bg-blue-800 rounded-3xl absolute top-44 right-28"></div>
                <div className="w-[70vw] h-2 bg-blue-800 rounded-3xl absolute top-40 right-28"></div>
                <div className="w-[61vw] h-2 bg-blue-800 rounded-3xl absolute top-36 right-28"></div>
            </div>
            <div className="pt-10 pb-10">
                <SignUp signInUrl='/admin-login'/>
            </div>
        </div>

        
        
        
    </div>
    
    </div>
    
  )
}

export default AdminRegisterPage