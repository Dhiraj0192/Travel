import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserSecret } from 'react-icons/fa';
import { GrNotes } from 'react-icons/gr';
import { IoLogOut } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { showToast } from '../helpers/showToast';
import { getEnv } from '../helpers/getEnv';
import { useDispatch } from 'react-redux';
import { removeUser } from "../redux/user/user.slice";

function UserIcon() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
  const dispath = useDispatch();
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
  return (
    <DropdownMenu>
              
            
    <DropdownMenuTrigger className="fixed bottom-10 right-10 z-50 flex">
    <Avatar className="w-16 h-16 border-gray-800 border-2">
        <AvatarImage src={user.user.avatar} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      
      {/* <IoMdArrowDropdownCircle className="h-7 w-7 -ml-8" /> */}

    </DropdownMenuTrigger>
    <DropdownMenuContent className=" w-[60vw] md:w-[30vw] lg:w-[18vw] min-h-[26vh] absolute bottom-0 right-10">
      <DropdownMenuLabel className="bg-gray-800 rounded-md">
          <p className="text-blue-300 ">{user.user.name}</p>
          <p className="text-sm text-white font-normal">
              {user.user.email}
          </p>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild className="text-md font-semibold mb-1 text-gray-500 hover:bg-gray-400">
          <Link to="/account">
          <FaUserSecret/>
          Profile</Link>
      </DropdownMenuItem>
      
      <DropdownMenuItem asChild className="text-md font-semibold mb-1 text-gray-500 hover:bg-gray-400">
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
  </DropdownMenu>
  )
}

export default UserIcon