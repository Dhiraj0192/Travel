import React, { useState, useEffect } from 'react';
import { FaTwitter } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import { GrInstagram } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function Footer() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [userSub, setUserSub] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

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
      alert("You have successfully subscribed!");
      setIsSubscribed(true);
    } catch (error) {
        setUserSub(false)
      console.error("Subscription failed:", error);
    }
  };

  return (
    <div className='w-full bg-gray-800 text-white'>
        <div className="flex md:flex-row flex-col mt-10  justify-between gap-10 pt-4 pb-8 mb-8 lg:px-32">
            <div className="flex flex-col justify-start w-full md:px-0 px-8 md:w-[33%] gap-1">
                <p className="font-bold text-lg text-white">Traveller's Mirror</p>
                <p className="text-gray-200">Modern publishing platform for bloggers of all levels.</p>

                <div className="flex gap-4 items-center">
                <FaTwitter className="w-6 h-6" />
                <SiFacebook className="w-6 h-6"/>
                <GrInstagram className="w-6 h-6"/>
                <FaLinkedin className="w-6 h-6"/>
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
              className='py-2 px-20 rounded-3xl bg-blue-800 text-white'
              onClick={handleSubscribe}
              disabled={isSubscribed}
            >
              {isSubscribed ? "Subscribed !!!" : userSub ? "Please wait...": "Let's Subscribe !"}
            </button>
            </div>
        </div>

        <div className="flex md:flex-row flex-col md:gap-0 gap-3 items-center justify-between mb-5 lg:px-32 px-3">
            <p className="text-gray-200 text-center">
            © 2025 Traveller's Mirror. All rights reserved. Designed By Dhiraj Yadav 😎
            </p>
            <div className="flex items-center justify-between gap-4">
                <Link to="/terms-condition">Terms of Service</Link>
                <Link to="/terms-condition">Privacy Policy</Link>
                <Link to="/terms-condition">Cookie Policy</Link>
            </div>
        </div>

    </div>
  )
}

export default Footer