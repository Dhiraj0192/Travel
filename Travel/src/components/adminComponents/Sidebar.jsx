import React, { useEffect } from 'react'
import { FaHome } from "react-icons/fa";
import { BsFileEarmarkPost } from "react-icons/bs";
import { FaComments } from "react-icons/fa6";
import { FaPenNib } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import Image from '../Image';
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { SignedOut, useAuth, UserButton } from '@clerk/clerk-react';
import { TbLogs } from "react-icons/tb";
import { LuPackage } from "react-icons/lu";


function Sidebar() {
    const location = useLocation();
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();


    // if ((location.pathname === '/admin-dashboard' || location.pathname === '/admin-posts' || location.pathname === '/admin-comments' || location.pathname === '/admin-categories') && !isSignedIn) {
    //     return <Navigate to="/admin-login" replace />;
    // }


    // if ((location.pathname === '/admin-login' || location.pathname === '/admin-register') && isSignedIn) {
    //     return <Navigate to="/admin-dashboard" replace />;
    // }
    

  return (
    <div className='  h-screen flex flex-col bg-gray-800 '>
        <div className="text-center">
            <h1 className="font-bold text-blue-500 text-xl pt-5 pb-5 border-b-2 border-gray-700">Traveller's Mirror </h1>

        </div>

        <div className="ml-6 mt-6 flex flex-col gap-4">
            <p className="text-gray-400 text-md font-bold">DASHBOARD</p>
            <div className="flex flex-col gap-4 items-start justify-start">
                <div className="ml-6 flex items-center justify-start gap-3">
                    <FaHome className='w-5 h-5 text-white'/>
                    <Link to="/admin-dashboard" ><p className="text-gray-300 text-md ">Dashboard</p> </Link>

                </div>
                <div className="ml-6 flex items-center justify-start gap-3">
                    <BsFileEarmarkPost className='w-5 h-5 text-white'/>
                    <Link to="/admin-add-blog" ><p className="text-gray-300 text-md ">Add Blog</p> </Link>
                    

                </div>
                

                <div className="ml-6 flex items-center justify-start gap-3">
                    <TbLogs className='w-5 h-5 text-white'/>
                    <Link to="/admin-posts" ><p className="text-gray-300 text-md ">Blogs</p> </Link>
                    

                </div>

                <div className="ml-6 flex items-center justify-start gap-3">
                    <TbLogs className='w-5 h-5 text-white'/>
                    <Link to="/admin-pending-posts" ><p className="text-gray-300 text-md ">Pending Blogs</p> </Link>
                    

                </div>
                <div className="ml-6 flex items-center justify-start gap-3">
                    <LuPackage className='w-5 h-5 text-white'/>
                    <Link to="/admin-packages" ><p className="text-gray-300 text-md ">Packages</p> </Link>
                    

                </div>
                <div className="ml-6 flex items-center justify-start gap-3">
                    <LuPackage className='w-5 h-5 text-white'/>
                    <Link to="/admin-add-package" ><p className="text-gray-300 text-md ">Add Package</p> </Link>
                    

                </div>

                <div className="ml-6 flex items-center justify-start gap-3">
                    <FaComments className='w-5 h-5 text-white'/>
                    
                    <Link to="/admin-comments" ><p className="text-gray-300 text-md ">Comments</p> </Link>

                </div>
                <div className="ml-6 flex items-center justify-start gap-3">
                    <FaPenNib className='w-5 h-5 text-white'/>
                    <Link to="/admin-categories" ><p className="text-gray-300 text-md ">Categories</p> </Link>
                    

                </div>
                <div className="ml-6 flex items-center justify-start gap-3">
                    <FaUser className='w-5 h-5 text-white'/>
                    <Link to="/admin-users" ><p className="text-gray-300 text-md ">Users</p> </Link>
                    

                </div>
            </div>
        </div>


        <div className="ml-6 mt-16 flex flex-col gap-4">
            <p className="text-gray-400 text-md font-bold">Advertise Management</p>
            <div className="flex flex-col gap-4 items-start justify-start">
                <div className="ml-6 flex items-center justify-start gap-3">
                    <FaUser className='w-5 h-5 text-white'/>
                    <Link to="/admin-add-advertise" ><p className="text-gray-300 text-md ">Add Advertise</p> </Link>

                </div>

            </div>
        </div>


        <div className="w-full pt-4 border-t-2 border-gray-500 flex items-center pl-6 absolute bottom-2 justify-between">
            <div className="flex items-center justify-between gap-3">
                
                

                <div className="flex flex-col ">
                    <p className="text-white font-bold text-sm">Dhiraj Yadav</p>
                    <p className="text-gray-500 text-sm">Administrator</p>
                </div>
            </div>
            <div className="text-white pr-3">
                
            <UserButton className="w-20 h-20"/>
            

            </div>
        </div>
        

    </div>
  )
}

export default Sidebar