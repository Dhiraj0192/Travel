import React, { useEffect, useState } from "react";
import { IKImage } from "imagekitio-react";
import Image from "./Image";
import { data, Link, useNavigate } from "react-router-dom";
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
import { MdOutlineSubscriptions } from "react-icons/md";
import { removeUser } from "../redux/user/user.slice";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { showToast } from "../helpers/showToast";
import { getEnv } from "../helpers/getEnv";
import { GrNotes } from "react-icons/gr";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import io from 'socket.io-client';
 
const socket = io('http://localhost:3000')

function Navbar() {
  
  // const { isSignedIn } = useAuth();
  const [notification, setNotification] = useState();


  const user = useSelector((state) => state.user);
  console.log(user);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket('http://localhost:3001');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'notification') {
        setNotifications(prev => [...prev, message.data]);
        // Optionally show browser notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(message.data.title, {
            body: message.data.body
          });
        }
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, []);

  // Request notification permission
  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission);
      });
    }
  };
  
 
  const navigate = useNavigate();

  const dispath = useDispatch()

  const handleLogout = async()=>{
    try {
          const response = await fetch(
            `${getEnv("VITE_API_BASE_URL")}/auth/logout`,
            {
              method: "get",
              
              credentials: "include",
              
            }
          );
    
          const data = await response.json();
          if (!response.ok) {
            return showToast("error", data.message);
          }
    
          dispath(removeUser())
          navigate("/");
          
        } catch (error) {
          showToast("error", error.message);
        }
  }

  // useEffect(() => {
  //   if (isSignedIn) {
  //     navigate('/home'); // Redirect to /home after login
  //   }
  // }, [isSignedIn, navigate]);
  const [open, setOpen] = useState(false);
  return (
    <div className="sticky top-0 overflow-hidden z-30 bg-gray-800 px-32 w-full h-16 md:h-20 flex items-center justify-between">
      {/* logo */}
      <Link
        to={`${user.isLoggedIn ? "/home" : "/"}`}
        className="flex items-center gap-4 text-2xl font-bold"
      >
        <Image src="logo.png" alt="logo" w={32} h={32} />
        <span className="text-white">Traveller's Mirror</span>
      </Link>
      {/* mobile menu */}
      <div className="md:hidden text-white">
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "X" : "☰"}
        </div>
        <div
          className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-all ease-in-out ${
            open ? "-right-0" : "-right-[100%]"
          }`}
        >
          <Link
            className="text-white"
            to={`${user.isLoggedIn ? "/home" : "/"}`}
          >
            Home
          </Link>
          <Link to="/">Trending</Link>
          <Link to="/">Most Popular</Link>
          <Link to="/">About</Link>
          <Link to="/">
            <button className="py-2 px-6 rounded-3xl bg-blue-800 text-white">
              Login{" "}
            </button>
          </Link>
        </div>
      </div>
      {/* desktop menu */}
      <div className="text-white hidden md:flex items-center gap-8 xl:gap-10 font-medium">
        <Link to={`${user.isLoggedIn ? "/home" : "/"}`}>Home</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/travel-packages">Packages</Link>

        
        {user.isLoggedIn === true && <SignedIn redirectUrl="/home"></SignedIn> ? <Link to="" ><DropdownMenu>
              
            
              <DropdownMenuTrigger className="">
              <IoNotifications className="h-6 w-6 mt-4 -mr-6" />
              <div className="bg-red-600 p-1 rounded-full w-6 h-6 flex items-center justify-center absolute top-4">
              <p className="  text-white">2</p>
              </div>

              </DropdownMenuTrigger>
              <DropdownMenuContent className=" w-[18vw] min-h-[30vh] absolute top-4 -right-32">
                
                
                <DropdownMenuItem asChild className="text-md font-semibold mb-1 text-gray-500 hover:bg-gray-200">
                <ul>
          {notifications.map((notif, index) => (
            <li key={index}>
              <h3>{notif.title}</h3>
              <p>{notif.body}</p>
              <small>{new Date(notif.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
            </DropdownMenuItem>
                
                
                
                
              </DropdownMenuContent>
            </DropdownMenu></Link> : <></>}
        
        
            
         

        

        <Link to="/write-blog" className="px-3 py-1 rounded-md bg-gray-300 text-black font-semibold text-md">Write Blog</Link>
        {/* <SignedOut> */}
        {!user.isLoggedIn ? (
          <Link to="/login">
            <Button className="py-2 px-6 rounded-3xl bg-blue-800 text-white">
              Login{" "}
            </Button>
          </Link>
        ) : (
          <>
            {/* <DropdownMenu>
              <Link to="/write-blog" className="px-3 py-1 rounded-md bg-gray-300 text-black font-semibold text-md">Write Blog</Link>
            
              <DropdownMenuTrigger className="absolute bottom-10 right-10">
              <Avatar>
                  <AvatarImage src={user.user.avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                
                <IoMdArrowDropdownCircle className="h-7 w-7 -ml-8" />

              </DropdownMenuTrigger>
              <DropdownMenuContent className=" w-[18vw] absolute top-4 -right-32">
                <DropdownMenuLabel className="bg-gray-800 rounded-md">
                    <p className="text-blue-300 ">{user.user.name}</p>
                    <p className="text-sm text-white font-normal">
                        {user.user.email}
                    </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="text-md font-semibold mb-1 text-gray-500 hover:bg-gray-200">
                    <Link to="/account">
                    <FaUserSecret/>
                    Profile</Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild className="text-md font-semibold mb-1 text-gray-500 hover:bg-gray-200">
                    <Link to="/your-blogs">
                    <GrNotes />
                    Your Blog</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-gray-200"/>
                
                <DropdownMenuItem onClick={handleLogout} className="text-md font-semibold mb-1 text-gray-500 hover:bg-gray-200">
                <IoLogOut/>
                Log Out
                </DropdownMenuItem>
                
              </DropdownMenuContent>
            </DropdownMenu> */}
          </>
        )}

        {/* </SignedOut>
            <SignedIn redirectUrl="/home">
                <UserButton />
            </SignedIn> */}
      </div>
    </div>
  );
}

export default Navbar;
