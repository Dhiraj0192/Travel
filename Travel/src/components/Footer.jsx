import React from 'react'
import { FaTwitter } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import { GrInstagram } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div className='w-full bg-gray-800 text-white'>
        <div className="flex mt-10  justify-between gap-10 pt-4 pb-8 mb-8 lg:px-32">
            <div className="flex flex-col justify-start w-[33%] gap-1">
                <p className="font-bold text-lg text-white">Traveller's Mirror</p>
                <p className="text-gray-200">Modern publishing platform for bloggers of all levels.</p>

                <div className="flex gap-4 items-center">
                <FaTwitter className="w-6 h-6" />
                <SiFacebook className="w-6 h-6"/>
                <GrInstagram className="w-6 h-6"/>
                <FaLinkedin className="w-6 h-6"/>
                </div>


            </div>

            <div className="flex flex-col justify-start gap-3 w-[33%] ml-20">
                <p className="font-bold text-lg text-white">Quick Links</p>
                <div className="flex flex-col">
                    <Link to="/">Home</Link>
                    <Link to="/">Features</Link>
                    <Link to="/">About</Link>
                    <Link to="/">Contact Us</Link>
                </div>
            </div>


            <div className="flex flex-col gap-3 w-[33%]">
            <p className="font-bold text-lg text-white">Stay Updated</p>
            <p className="font-bold text-gray-200">Subscribe to our newsletter for the latest updates and blogging tips.</p>

            <Link to="/">
                            <button className='py-2 px-20 rounded-3xl bg-blue-800 text-white'>Subscribe !</button>
                        </Link>
            </div>
        </div>

        <div className="flex items-center justify-between mb-5 lg:px-32">
            <p className="text-gray-200">
            © 2025 Traveller's Mirror. All rights reserved. Designed By Dhiraj Yadav 😎
            </p>
            <div className="flex items-center justify-between gap-4">
                <Link to="/">Terms of Service</Link>
                <Link to="/">Privacy Policy</Link>
                <Link to="/">Cookie Policy</Link>
            </div>
        </div>

    </div>
  )
}

export default Footer