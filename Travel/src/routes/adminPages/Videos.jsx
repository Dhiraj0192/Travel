import React, { useEffect, useState } from "react";
import { FiSearch, FiPlus, FiFilter, FiChevronDown } from "react-icons/fi";
import Sidebar from "../../components/adminComponents/Sidebar";
import AllPost from "../../components/adminComponents/AllPost";
import { showToast } from "../../helpers/showToast";
import { Card } from "../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { getEnv } from "../../helpers/getEnv";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import slugify from "slugify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useFetch } from "../../hooks/userFetch";
import Dropzone from "react-dropzone";
import Editor from "../../components/Editor";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import AllVideos from "../../components/adminComponents/AllVideo";
import { useSelector } from "react-redux";

function Videos() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user);
  console.log(user);
  

  // Protect the /single page route
  if (!user.isAdminLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  const [query, setQuery] = useState();
    let [searchData , setSearchData] = useState();
      let [bData , setBData] = useState();
       const [sort, setSort] = useState("-createdAt");
       const [limit, setLimit] = useState(100000);
       const [page, setPage] = useState(1);
      const [currentPage, setCurrentPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);
     
      const [sidebarOpen, setSidebarOpen] = useState(false);
      const [refreshData, setRefreshData] = useState(false);

  

useEffect(() => {
    let isMounted = true; // Track if the component is still mounted
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/video/get-all2?page=${page}&limit=9`,
          {
            method: "get",
            credentials: "include",
          },[refreshData]
        );
        const data = await response.json();
        
        
        if (isMounted && response.ok) {
          setBData(data);
          
          
          setTotalPages(data.totalPages || 1);
        }
      } catch (error) {
        if (isMounted) {
          console.error(error.message);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to prevent state updates on unmounted components
    };
  }, [page]);

 

  // search
  
    const getInput = (e) => {
      setQuery(e.target.value);
    };
  
    const handleSubmit = async (e, page = 1) => {
        e.preventDefault();
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/video/search2/${query}?page=${page}&limit=9`,
          {
            method: "get",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (response.ok && data?.blog.length > 0) {
          setSearchData(data.blog);
          setTotalPages(data.totalPages || 1);
        } else {
          console.error(data.message);
        }
      };
    
      const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
          setCurrentPage(newPage);
        }
      };
    
      useEffect(() => {
        if (searchData) {
          handleSubmit({ preventDefault: () => {} }, currentPage);
        } else {
          setPage(currentPage);
        }
      }, [currentPage]);
    
      useEffect(() => {
        if (searchData) {
          setBData(""); // Clear other data when searchData is present
          
        }
      }, [searchData]);
    
      
    const renderPagination = () => {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-4 py-1 rounded-md ${
              currentPage === i
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black hover:bg-gray-500 hover:text-white"
            }`}
          >
            {i}
          </button>
        );
      }
      return pages;
    };

  return (
    <div className="w-full flex">
      {/* Sidebar */}
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-black">Manage Video</h1>
            <p className="text-gray-800 mt-3">
              Create, edit, and manage your video posts
            </p>
          </div>

          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <FiPlus />
            <Link to="/admin-add-video">New Video</Link>
          </button>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 ">
            {/* Search Input */}
            <div className="relative flex-1 bg-gray-500">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-green-400" />
              </div>
              <form onSubmit={handleSubmit}>
              <input
              name="q"
              onInput={getInput}
                type="text"
                placeholder="Search posts..."
                className=" pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              </form>
            </div>

           
          </div>

          <AllVideos searchData={searchData} bData={bData}/>
          <div className="w-full h-[1px] bg-gray-500"></div>
          <div className=" pagination-controls flex justify-center items-center gap-4 mt-6 mb-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-1 rounded-md bg-gray-300 text-gray-900 hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            {renderPagination()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Videos;
