import React, { useEffect, useState } from "react";

import Sidebar from "../../components/adminComponents/Sidebar";

import { getEnv } from "../../helpers/getEnv";

import { useFetch } from "../../hooks/userFetch";

import { useAuth, useUser } from "@clerk/clerk-react";

import { Navigate, useNavigate } from "react-router-dom";

import AddLinks from "../../components/adminComponents/addLinks";
import EditLinks from "../../components/adminComponents/editLink";
import AddHero from "../../components/adminComponents/AddHero";
import EditHero from "../../components/adminComponents/EditHero";
import { useSelector } from "react-redux";


function AddHeroSection() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  // console.log(user);
  

  // Protect the /single page route
  if (!user.isAdminLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }
  

  const [filePreview, setFilePreview] = useState();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  const {
    data: otherData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/other/details`, {
    method: "get",
    credentials: "include",
  });

  

  const {
    data: HeroData,
    
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/herosection/`, {
    method: "get",
    credentials: "include",
  });

  

  

  return (
    <div className="w-full flex ">
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
        
        
        {HeroData?.heroSections != null ? <EditHero /> : <AddHero />}

        {otherData ? <EditLinks /> : <AddLinks />}
      </div>
    </div>
  );
}

export default AddHeroSection;
