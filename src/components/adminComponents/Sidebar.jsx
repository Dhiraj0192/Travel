import React from 'react'
import { FaHome } from "react-icons/fa";
import { BsFileEarmarkPost } from "react-icons/bs";
import { FaComments } from "react-icons/fa6";
import { FaPenNib } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import Image from '../Image';
import { RiLogoutBoxRLine } from "react-icons/ri";

function Sidebar() {
  return (
    <div className='w-[20%] h-screen flex flex-col bg-gray-800 '>
        <div className="text-center">
            <h1 className="font-bold text-blue-500 text-xl pt-5 pb-5 border-b-2 border-gray-700">Traveller's Mirror </h1>

        </div>

        <div className="ml-6 mt-6 flex flex-col gap-4">
            <p className="text-gray-400 text-md font-bold">DASHBOARD</p>
            <div className="flex flex-col gap-4 items-start justify-start">
                <div className="ml-6 flex items-center justify-start gap-3">
                    <FaHome className='w-5 h-5 text-white'/>
                    <p className="text-gray-300 text-md ">Dashboard</p>

                </div>

                <div className="ml-6 flex items-center justify-start gap-3">
                    <BsFileEarmarkPost className='w-5 h-5 text-white'/>
                    <p className="text-gray-300 text-md ">Posts</p>

                </div>

                <div className="ml-6 flex items-center justify-start gap-3">
                    <FaComments className='w-5 h-5 text-white'/>
                    <p className="text-gray-300 text-md ">Comments</p>

                </div>
                <div className="ml-6 flex items-center justify-start gap-3">
                    <FaPenNib className='w-5 h-5 text-white'/>
                    <p className="text-gray-300 text-md ">Categories</p>

                </div>
            </div>
        </div>


        <div className="ml-6 mt-16 flex flex-col gap-4">
            <p className="text-gray-400 text-md font-bold">SETTINGS</p>
            <div className="flex flex-col gap-4 items-start justify-start">
                <div className="ml-6 flex items-center justify-start gap-3">
                    <FaUser className='w-5 h-5 text-white'/>
                    <p className="text-gray-300 text-md ">Profile</p>

                </div>

                

                
            </div>
        </div>


        <div className="pt-4 border-t-2 border-gray-500 flex items-center w-[20%] pl-6 absolute bottom-2 justify-between">
            <div className="flex items-center justify-start gap-3">
                <Image src="featured1.jpeg" className="w-10 h-10 rounded-full"/>

                <div className="flex flex-col ">
                    <p className="text-white font-bold text-sm">Dhiraj Yadav</p>
                    <p className="text-gray-500 text-sm">Administrator</p>
                </div>
            </div>
            <div className="text-white pr-3">
            <RiLogoutBoxRLine className='w-8 h-8 text-white'/>

            </div>
        </div>
        

    </div>
  )
}

export default Sidebar