import React, { useEffect, useState } from 'react'
import AddAdvertise from './AddAdvertise'
import { useFetch } from '../../hooks/userFetch';
import { getEnv } from '../../helpers/getEnv';
import { Link } from 'react-router-dom';
import EditAdvertise from './EditAdvertise';
import SinglePostAddAdvertise from './SinglePostAddAdvertise';
import Sidebar from '../../components/adminComponents/Sidebar';
import SinglePostEditAdvertise from './SinglePostEditAdd';

function Advertise() {
     
     const [sidebarOpen, setSidebarOpen] = useState(false);
     
    const { data: advertise } = useFetch(
        `${getEnv("VITE_API_BASE_URL")}/advertise/advertise`,
        {
          method: "get",
          credentials: "include",
        }
      );

      const { data: singlepostadvertise } = useFetch(
        `${getEnv("VITE_API_BASE_URL")}/advertise/singlepost/advertise`,
        {
          method: "get",
          credentials: "include",
        }
      );

      
      
    
    
  return (
    <div className="w-full flex bg-transparent">
      <div
        className={`fixed z-50 bg-gray-800 h-screen transition-transform ${
          sidebarOpen ? "translate-x-0 w-[65%]" : "-translate-x-full"
        } lg:translate-x-0 lg:w-[20%]`}
      >
        <Sidebar />
      </div>

      <div className="w-full lg:w-[80%] absolute lg:left-[20%] bg-[url(/346596-PAQ0SL-281.jpg)] bg-cover bg-no-repeat px-6 py-6 min-h-screen">
        {/* Toggle Button for Mobile */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-black text-3xl focus:outline-none"
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>
        {advertise?.advertise.length > 0 ? (
                <EditAdvertise/>
              ) : (
                <AddAdvertise/>
              )}

        {singlepostadvertise?.advertise.length > 0 ? (
                <SinglePostEditAdvertise/>
              ) : (
                <SinglePostAddAdvertise/>
              )}

        


        
       
    </div>
    </div>
  )
}

export default Advertise