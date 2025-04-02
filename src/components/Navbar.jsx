import React, { useEffect, useState } from 'react'
import { IKImage } from 'imagekitio-react';
import Image from './Image';
import { Link, useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, useAuth, UserButton } from "@clerk/clerk-react";

function Navbar() {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isSignedIn) {
        navigate('/home'); // Redirect to /home after login
      }
    }, [isSignedIn, navigate]);
    const [open , setOpen] = useState(false);
  return (
    <div className='sticky top-0 overflow-hidden z-30 bg-black px-32 w-full h-16 md:h-20 flex items-center justify-between'>
        {/* logo */}
        <Link to={`${isSignedIn ? '/home' : '/'}`} className="flex items-center gap-4 text-2xl font-bold">
            <Image src="logo.png" alt="logo" w={32} h={32}/>
            <span className='text-white'>Traveller's Mirror</span>
        </Link>
        {/* mobile menu */}
        <div className="md:hidden text-white">
            <div className="cursor-pointer text-4xl" onClick={()=>setOpen((prev)=>!prev)}>
                {open ? "X" : "☰"}
            </div>
            <div className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-all ease-in-out ${open ? "-right-0" : "-right-[100%]"}`}>
            <Link className='text-white' to={`${isSignedIn ? '/home' : '/'}`}>Home</Link>
            <Link to="/">Trending</Link>
            <Link to="/">Most Popular</Link>
            <Link to="/">About</Link>
            <Link to="/">
                <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>Login 👋</button>
            </Link>
            </div>
        </div>
        {/* desktop menu */}
        <div className="text-white hidden md:flex items-center gap-8 xl:gap-12 font-medium">
            <Link to={`${isSignedIn ? '/home' : '/'}`}>Home</Link>
            <Link to="/">Trending</Link>
            <Link to="/">Most Popular</Link>
            <Link to="/">About</Link>
            <SignedOut>
            <Link to="/login">
                <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>Login 👋</button>
            </Link>
            </SignedOut>
            <SignedIn redirectUrl="/home">
                <UserButton />
            </SignedIn>
            
        </div>
    </div>
  )
}

export default Navbar