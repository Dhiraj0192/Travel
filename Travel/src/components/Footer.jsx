import React, { useState, useEffect } from 'react';
import { FaTwitter } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import { GrInstagram } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { AiFillTikTok } from 'react-icons/ai';
import { IoLogoYoutube } from 'react-icons/io';
import { IoLogoWechat } from 'react-icons/io5';

function Footer() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [userSub, setUserSub] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState();

  useEffect(() => {
    const checkSubscription = async () => {
      if (user.isLoggedIn) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/email/check-subscription`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.user.email }),
          });

          const data = await response.json();
          if (response.ok && data.isSubscribed) {
            setIsSubscribed(true);
          }
        } catch (error) {
          console.error("Failed to check subscription:", error);
        }
      }
    };

    checkSubscription();
  }, [user]);

  const handleSubscribe = async () => {
    if (!user.isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
        setUserSub(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/email/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.user.email }),
      });

      const data = await response.json();
      if (!response.ok) {
        setUserSub(false);
        alert(data.message);
        return;
      }
      setUserSub(false)
      
      setSubscribeMessage("You have successfully subscribed!")
      setIsSubscribed(true);
    } catch (error) {
        setUserSub(false)
      console.error("Subscription failed:", error);
    }
  };

  return (
    <div className='md:px-8 lg:px-0 w-full bg-gray-800 text-white'>
        <div className="flex md:flex-row flex-col mt-10  justify-between gap-10 pt-4 pb-8 mb-8 lg:px-32">
            <div className="flex flex-col justify-start w-full md:px-0 px-8 md:w-[33%] gap-1">
                <p className="font-bold text-lg text-white">Traveler's Mirror</p>
                <p className="text-gray-200">Modern publishing platform for bloggers of all levels.</p>

                <div className="flex gap-4 items-center">
                
                <Link to=""><IoLogoWechat className="w-7 h-7 hover:text-red-400 cursor-pointer" /></Link>
                <Link to="https://www.tiktok.com/@travelersmirror?_t=ZS-8vsDauBKb3f&_r=1"><AiFillTikTok className="w-7 h-7 hover:text-red-400 cursor-pointer" /></Link>
                          <Link to="https://www.facebook.com/share/16Tyh7JMcB/?mibextid=wwXIfr"><SiFacebook className="w-5 h-5 hover:text-blue-600 cursor-pointer" /></Link>
                          <Link to="https://www.instagram.com/travelersmirror?igsh=MXY1OHpoaXR2bWM1Mw%3D%3D&utm_source=qr">
                          <GrInstagram className="w-5 h-5 hover:text-pink-500 cursor-pointer" />
                          
                          </Link>
                         
                          <Link to="https://youtube.com/@travelersmirror8848?si=pvk2n6NFItoOpVYI"><IoLogoYoutube className="w-7 h-7 hover:text-red-700 cursor-pointer" /></Link>
                </div>


            </div>

            <div className="flex flex-col justify-start gap-3 w-full md:px-0 px-8 md:w-[33%] md:ml-20">
                <p className="font-bold text-lg text-white">Quick Links</p>
                <div className="flex flex-col">
                    <Link to="/home">Home</Link>
                    <Link to="/blogs">Blogs</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact Us</Link>
                </div>
            </div>


            <div className="flex flex-col gap-3 w-full md:px-0 px-8 md:w-[33%]">
            <p className="font-bold text-lg text-white">Stay Updated</p>
            <p className="font-bold text-gray-200">Subscribe to our newsletter for the latest updates and blogging tips.</p>
            <button
              className='py-2 px-6 lg:px-20 rounded-3xl bg-blue-800 text-white'
              onClick={handleSubscribe}
              disabled={isSubscribed}
            >
              {isSubscribed ? "Subscribed !!!" : userSub ? "Please wait...": "Let's Subscribe !"}
            </button>
            {subscribeMessage != undefined && <p className='text-center text-blue-200'>{subscribeMessage}</p>}
            </div>
        </div>

        <div className="flex md:flex-row flex-col md:gap-0 gap-3 items-center justify-between mb-5 lg:px-32 px-3">
            <p className="text-gray-200 text-center">
            © 2025 Traveler's Mirror. All rights reserved. Developed By Sera Digital Hub
            </p>
            <div className="flex items-center justify-between gap-4">
                <Link to="/terms-condition">Terms of Service</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
                
            </div>
        </div>

    </div>
  )
}

export default Footer