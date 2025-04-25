import React, { useEffect, useState } from "react";
import { IKImage } from "imagekitio-react";
import Image from "./Image";
import { Link, useNavigate } from "react-router-dom";
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
import { IoMdAdd } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { MdEmail, MdOutlineSubscriptions } from "react-icons/md";
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




function Navbar() {
  const { isSignedIn } = useAuth();
  const [notification, setNotification] = useState();
  const user = useSelector((state) => state.user);
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
    
        console.log(otherData);

  

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
      navigate("/");
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center relative w-full">
      {/* Top Info Bar - Desktop Only */}
      <div className="bg-gray-800 hidden lg:flex flex-col lg:flex-row lg:items-center lg:justify-between lg:px-56 p-3 z-30 w-full">
        <div className="flex items-center justify-center gap-4 text-white text-sm">
          <div className="flex items-center gap-1">
            <MdEmail className="w-5 h-5" />
            <span>{otherData?.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapIcon className="w-5 h-5" />
            <span>{otherData?.location}</span>
          </div>
        </div>

        <div className="flex gap-4 items-center text-white">
          <FaTwitter className="w-5 h-5 hover:text-blue-400 cursor-pointer" />
          <SiFacebook className="w-5 h-5 hover:text-blue-600 cursor-pointer" />
          <GrInstagram className="w-5 h-5 hover:text-pink-500 cursor-pointer" />
          <FaLinkedin className="w-5 h-5 hover:text-blue-700 cursor-pointer" />
        </div>

        <div className="flex items-center gap-3">
          <PhoneCall className="w-8 h-8 rounded-full bg-blue-800 text-white p-2" />
          <div className="flex flex-col text-white">
            <p className="font-bold text-sm">Call For Enquiry</p>
            <p className="text-sm">{otherData?.number}</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="sticky top-0 z-50 bg-gray-200 px-4 lg:px-32 w-full h-18 flex items-center justify-between shadow-md pt-5 pb-3">
        {/* Logo */}
        <Link
          to={user.isLoggedIn ? "/home" : "/"}
          className="flex items-center gap-2 lg:gap-4"
        >
          <Image
            src="logo.png"
            alt="logo"
            w={28}
            h={28}
            className="lg:w-10 lg:h-10"
          />
          <span className="text-black text-lg lg:text-xl font-bold">
            Traveller's Mirror
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6 text-gray-700 font-medium">
            <Link to={user?.isLoggedIn ? "/home" : "/"} className="hover:text-blue-800">
              Home
            </Link>
            <Link to="/blogs" className="hover:text-blue-800">
              Blogs
            </Link>
            <Link to="/gallery" className="hover:text-blue-800">
              Gallery
            </Link>
            <Link to="/about" className="hover:text-blue-800">
              About
            </Link>
            <Link to="/contact" className="hover:text-blue-800">
              Contact
            </Link>
            <Link to="/travel-packages" className="hover:text-blue-800">
              Packages
            </Link>
          </div>

          {user.isLoggedIn && (
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
            {user.isLoggedIn ? (
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
          {user.isLoggedIn && (
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
            className={`absolute left-0 top-16 w-3/4 h-[calc(100vh-4rem)] bg-white transform transition-transform ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col p-4 space-y-4 overflow-y-auto">
              <Link
                to={user?.isLoggedIn ? "/home" : "/"}
                className="py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/blogs"
                className="py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setOpen(false)}
              >
                Blogs
              </Link>
              <Link
                to="/gallery"
                className="py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setOpen(false)}
              >
                Gallery
              </Link>
              <Link
                to="/about"
                className="py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/travel-packages"
                className="py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setOpen(false)}
              >
                Packages
              </Link>

              <div className="border-t pt-4 mt-4">
                {user.isLoggedIn ? (
                  <>
                    <Link
                      to="/write-blog"
                      className="block w-full py-3 px-4 text-center bg-blue-800 text-white rounded-md mb-4"
                      onClick={() => setOpen(false)}
                    >
                      Write Blog
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full py-3 px-4 text-center text-red-600 hover:bg-red-50 rounded-md"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block w-full py-3 px-4 text-center bg-blue-800 text-white rounded-md"
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