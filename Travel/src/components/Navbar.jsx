import React, { useEffect, useState } from "react";
import { IKImage } from "imagekitio-react";
import Image from "./Image";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { FaUserSecret } from "react-icons/fa6";
import { IoLogoYoutube, IoMdAdd, IoMdHome, IoMdPhotos } from "react-icons/io";
import { IoLogOut, IoLogoWechat } from "react-icons/io5";
import { MdContentPaste, MdEmail, MdOutlineSubscriptions, MdOutlineVideoSettings } from "react-icons/md";
import { removeUser } from "../redux/user/user.slice";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { showToast } from "../helpers/showToast";
import { getEnv } from "../helpers/getEnv";
import { GrInstagram, GrNotes } from "react-icons/gr";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import io from "socket.io-client";
import { Facebook, MapIcon, PhoneCall } from "lucide-react";
import { SiFacebook } from "react-icons/si";
import { FaLinkedin, FaTwitter, FaCheck } from "react-icons/fa";
import { useFetch } from "../hooks/userFetch";
import { AiFillTikTok } from "react-icons/ai";
import { RiContactsBook3Line, RiWhatsappFill } from "react-icons/ri";

import { LiaBlogSolid } from "react-icons/lia";
import { LuPackageSearch } from "react-icons/lu";


function Navbar() {
  const location = useLocation();
  const { isSignedIn } = useAuth();
  const [notification, setNotification] = useState();
  const user = useSelector((state) => state.user);
  const storedToken = localStorage.getItem('access_token');
  
  console.log(storedToken);
  
  
  
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
          data: otherData,
          loading,
          error,
        } = useFetch(`${getEnv("VITE_API_BASE_URL")}/other/details`, {
          method: "get",
          credentials: "include",
        });
    
        

  

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/notification/${user?.user._id}`,
          { credentials: "include" }
        );
        if (response.ok) {
          const data = await response.json();
          setNotifications(data.notifications);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    if (user.isLoggedIn) fetchNotifications();
  }, [user]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/notification/${notificationId}`,
        { method: "DELETE", credentials: "include" }
      );
      if (response.ok) {
        setNotifications((prev) => prev.filter((notif) => notif._id !== notificationId));
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) return showToast("error", data.message);
      
      dispatch(removeUser());
      localStorage.removeItem('access_token');
      navigate("/");
    } catch (error) {
      showToast("error", error.message);
    }
  };

  useEffect(() => {
    const handleUnload = () => {
      localStorage.clear();
    };
    window.addEventListener('unload', handleUnload);
    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  return (
    <div className="flex flex-col items-center relative w-full">
      {/* Top Info Bar - Desktop Only */}
      <div className="bg-gray-800 hidden lg:flex flex-col lg:flex-row lg:items-center lg:justify-between lg:px-56 p-3 z-30 w-full">
        <div className="flex items-center justify-center gap-4 text-white text-sm">
          <div className="flex items-center gap-1">
            <MdEmail className="w-5 h-5" />
            <a href={`mailto:${otherData?.email}`} target="_blank" rel="noopener noreferrer">
              <span>{otherData?.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-1">
            <MapIcon className="w-5 h-5" />
            <span>{otherData?.location}</span>
          </div>
        </div>

        <div className="flex gap-4 items-center text-white">
        <Link to=""><IoLogoWechat className="w-7 h-7 hover:text-red-400 cursor-pointer" /></Link>
          <Link to="https://www.tiktok.com/@travelersmirror?_t=ZS-8vsDauBKb3f&_r=1"><AiFillTikTok className="w-7 h-7 hover:text-red-400 cursor-pointer" /></Link>
          <Link to="https://www.facebook.com/share/16Tyh7JMcB/?mibextid=wwXIfr"><SiFacebook className="w-5 h-5 hover:text-blue-600 cursor-pointer" /></Link>
          <Link to="https://www.instagram.com/travelersmirror?igsh=MXY1OHpoaXR2bWM1Mw%3D%3D&utm_source=qr">
          <GrInstagram className="w-5 h-5 hover:text-pink-500 cursor-pointer" />
          
          </Link>
         
          <Link to="https://youtube.com/@travelersmirror8848?si=pvk2n6NFItoOpVYI"><IoLogoYoutube className="w-7 h-7 hover:text-red-700 cursor-pointer" /></Link>
          
        </div>

        <div className="flex items-center gap-3">
          <a href={`https://wa.me/${otherData?.number}`} target="_blank" rel="noopener noreferrer">
            <RiWhatsappFill className="w-8 h-8 rounded-full bg-green-600 text-white p-2" />
          </a>
          <div className="flex flex-col text-white">
            <p className="font-bold text-sm">Call For Enquiry</p>
            <a href={`https://wa.me/${otherData?.number}`} target="_blank" rel="noopener noreferrer"><p className="text-sm">{otherData?.number}</p></a>
            
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="sticky top-0 z-50 bg-white px-4 lg:px-32 w-full h-18 flex items-center justify-between shadow-md pt-5 pb-3">
        {/* Logo */}
        <Link
          to={user.isLoggedIn || storedToken ? "/home" : "/"}
          className="flex items-center gap-2 lg:gap-4"
        >
          <img
            src="/travelersmirror.png"
            alt="logo"
            
            className="lg:w-[16vw] lg:h-16 w-[35vw] md:w-[20vw]"
          />
          {/* <span className="text-black text-lg lg:text-xl font-bold">
            Traveler's Mirror
          </span> */}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6 text-gray-700 font-medium">
            <Link
              to={user?.isLoggedIn || storedToken ? "/home" : "/"}
              className={`hover:text-blue-800 ${location.pathname === "/home" || location.pathname === "/" ? "text-blue-800 font-bold" : ""}`}
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className={`hover:text-blue-800 ${location.pathname === "/blogs" ? "text-blue-800 font-bold" : ""}`}
            >
              Blogs
            </Link>
            <Link
              to="/videos"
              className={`hover:text-blue-800 ${location.pathname === "/videos" ? "text-blue-800 font-bold" : ""}`}
            >
              Videos
            </Link>
            <Link
              to="/gallery"
              className={`hover:text-blue-800 ${location.pathname === "/gallery" ? "text-blue-800 font-bold" : ""}`}
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className={`hover:text-blue-800 ${location.pathname === "/about" ? "text-blue-800 font-bold" : ""}`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`hover:text-blue-800 ${location.pathname === "/contact" ? "text-blue-800 font-bold" : ""}`}
            >
              Contact
            </Link>
            <Link
              to="/travel-packages"
              className={`hover:text-blue-800 ${location.pathname === "/travel-packages" ? "text-blue-800 font-bold" : ""}`}
            >
              Packages
            </Link>
          </div>

          {user.isLoggedIn || storedToken && (
            <DropdownMenu>
              <DropdownMenuTrigger className="relative mr-4">
                <IoNotifications className="h-6 w-6 text-gray-700" />
                {notifications.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center">
                    <span className="text-white text-xs">
                      {notifications.length}
                    </span>
                  </div>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[27vw] min-h-24 max-h-96 overflow-y-auto mt-5">
                {notifications.map((notif) => (
                  <DropdownMenuItem
                    key={notif._id}
                    className="flex justify-between items-center p-2"
                  >
                    {notif?.message ? <p className="w-full text-sm text-white bg-gray-800 p-2 rounded-md">{notif.message}</p> : <span className="text-sm text-gray-800">No Notification !!</span> }
                    <Button
                      variant="ghost"
                      className="text-red-500 hover:text-red-700 p-1 text-2xl"
                      onClick={() => handleMarkAsRead(notif._id)}
                    >
                      ×
                    </Button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <div className="flex items-center gap-4 ml-4">
            {user.isLoggedIn || storedToken ? (
              <>
                <Link
                  to="/write-blog"
                  className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900"
                >
                  Write Blog
                </Link>
                
              </>
            ) : (
              
                <Link to="/login">
                  <Button className="bg-blue-800 hover:bg-blue-900 text-white">
                    Login
                  </Button>
                </Link>
              
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden items-center gap-4">
          {user.isLoggedIn || storedToken && (
            <div className="relative">
              <IoNotifications className="h-6 w-6 text-gray-700" />
              {notifications.length > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center">
                  <span className="text-white text-xs">
                    {notifications.length}
                  </span>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="text-3xl text-gray-700 focus:outline-none"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setOpen(false)}
        >
          <div
            className={`absolute left-0 top-0 w-3/4 h-[calc(100vh-0rem)] bg-white transform transition-transform ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col p-2 space-y-2 overflow-y-auto">
              <div className="w-full h-[10vh] bg-blue-800 rounded-sm flex items-center px-2 gap-2">
                {user.isLoggedIn || storedToken  ? <><img src={user?.user?.avatar} className="w-12 h-12 rounded-full" alt="" srcset="" />
                <div className="flex flex-col ">
                <p className="text-white font-bold">{user?.user?.name}</p>
                <p className="text-white text-sm ">{user?.user?.email}</p>
                </div></> : <><div className="px-2"><p className="text-white font-bold text-xl">Travelers Mirror</p></div></>}
              </div>
              <Link
                to={user?.isLoggedIn || storedToken ?  "/home" : "/"}
                className="flex items-center  gap-2 py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setOpen(false)}
              ><IoMdHome className="w-5 h-5 mb-1"/>
                Home
              </Link>
              <Link
                to="/blogs"
                className="flex items-center  gap-2 py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setOpen(false)}
              >
                <LiaBlogSolid className="w-5 h-5 mb-1"/>
                Blogs
              </Link>
              <Link
                to="/videos"
                className="flex items-center  gap-2 py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setOpen(false)}
              >
                <MdOutlineVideoSettings className="w-5 h-5 mb-1"/>
                Videos
              </Link>
              <Link
                to="/gallery"
                className="flex items-center  gap-2 py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setOpen(false)}
              >
                <IoMdPhotos className="w-5 h-5 mb-1"/>
                Gallery
              </Link>
              <Link
                to="/about"
                className="flex items-center  gap-2 py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setOpen(false)}
              >
                <MdContentPaste className="w-5 h-5 mb-1"/>
                About
              </Link>
              <Link
                to="/contact"
                className="flex items-center  gap-2 py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setOpen(false)}
              >
                <RiContactsBook3Line className="w-5 h-5 mb-1"/>
                Contact
              </Link>
              <Link
                to="/travel-packages"
                className="flex items-center  gap-2 py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setOpen(false)}
              >
                <LuPackageSearch className="w-5 h-5 mb-1"/>
                Packages
              </Link>

              <div className="border-t pt-4 mt-4">
                
                {user.isLoggedIn || storedToken ? (
                  <>
                  <Link
                to="/your-blogs"
                className="flex items-center  gap-2 py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setOpen(false)}
              >
                <LiaBlogSolid className="w-5 h-5 mb-1"/>
                Your Blogs
              </Link>
              <Link
                to="/account"
                className="flex items-center  gap-2 py-2 px-4 mb-3 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setOpen(false)}
              >
                <RiContactsBook3Line className="w-5 h-5 mb-1"/>
                Account
              </Link>
                    <Link
                      to="/write-blog"
                      className="block w-full py-1 px-4 text-center bg-blue-800 text-white rounded-md mb-4"
                      onClick={() => setOpen(false)}
                    >
                      Write Blog
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="border-t-2 block w-full py-3 px-4 text-center text-red-600 hover:bg-red-50 rounded-md"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block w-full py-1 px-4 text-center bg-blue-800 text-white rounded-md"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;