import React, { useState } from "react";
import Image from "../components/Image";
import Footer from "../components/Footer";
import { IoIosCall } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useFetch } from "../hooks/userFetch";
import { getEnv } from "../helpers/getEnv";
import { Link, Navigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaRocketchat } from "react-icons/fa";
import UserIcon from "../components/UserIcon";

function TravelBookingPage() {
    const user = useSelector((state) => state.user);
    
    
  
    

     const [sort, setSort] = useState("-createdAt");
      
      const [query, setQuery] = useState();
      let [searchData , setSearchData] = useState();
      const [refreshData, setRefreshData] = useState(false);
    
      
    
      let {
        data: packageData,
        loading,
        error,
      } = useFetch(`${getEnv("VITE_API_BASE_URL")}/package/all-package`, {
        method: "get",
        credentials: "include",
      },[refreshData]);
    
    //   console.log(blogData);
      
     const {
                      data: otherData,
                      
                    } = useFetch(`${getEnv("VITE_API_BASE_URL")}/other/details`, {
                      method: "get",
                      credentials: "include",
                    });
    
     
    
      // search
    
      const getInput = (e) => {
        setQuery(e.target.value);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(query);
    
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/package/search/${query}`,
          {
            method: "get",
            credentials: "include",
          }
        );
    
        const usersearchdata = await response.json();
        console.log(usersearchdata);
        
        if (usersearchdata?.packag.length > 0) {
          setSearchData(usersearchdata?.packag)
          console.log(searchData);
          
        }
        
      };
    
      if (searchData != undefined) {
        
        packageData = [];
        
      }
    
      
  return (
    <div className="flex flex-col min-h-screen">
      {user?.isLoggedIn && <UserIcon/>}
      <div className="w-full ">
        <div className="overflow-hidden bg-gradient-to-b from-[#4b55678b] to-[#1a1c208b] bg-opacity-5 h-[40vh] lg:h-[54vh]">
        <img
          src="https://images.pexels.com/photos/5077049/pexels-photo-5077049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          className="w-full h-[47vh] lg:h-[74vh] absolute top-0 -z-10 bg-cover "
        />
        {/* breadcrumb */}
        <div className="h-[40vh] flex flex-col justify-center">
          {/* introduction */}
          <div className="lg:px-32 flex items-center justify-between">
            <div className="mt-10 px-6 md:px-6 lg:px-0 lg:mt-40 w-full lg:w-[60vw]">
              <h1 className=" text-white text-xl md:text-5xl lg:text-5xl font-bold">
                Discover Your Perfect Travel Experience
              </h1>
              <p className="text-gray-200 text-lg font-semibold font-serif mt-6">
                Exclusive travel packages curated for unforgettable adventures
                around the world
              </p>
              <div className="w-full flex flex-col">
                <div className="lg:pr-32 -mt-4 pb-10 w-[30vw]">
                  <div className="hidden lg:flex bg-gray-700 rounded-xl p-1 shadow-xl items-center justify-center gap-8 mt-10 w-[50vw] mb-5">
                    <div className=" bg-gray-100 p-8 rounded-xl h-30 flex flex-col items-start gap-2 w-full">
                      <p className="text-gray-700 text-sm mb-1 text-left ml-8">
                        Packages name
                      </p>
                      <div className="flex items-center gap-3 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          fill="none"
                          stroke="gray"
                        >
                          <circle cx="10.5" cy="10.5" r="7.5" />
                          <line x1="16.5" y1="16.5" x2="22" y2="22" />
                        </svg>
                        <form>
                          <input
                            name="q"
                            onInput={getInput}
                            type="text"
                            placeholder="search packages here..."
                            className=" bg-transparent w-[33vw] border-0 outline-none"
                          />
                        </form>

                        <button className="bg-blue-600 text-white rounded-xl px-10 py-3 ">
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        
        

        <div className="flex flex-col lg:px-32 w-full mt-20 mb-10 px-1">
          <div className="flex flex-col items-center gap-3 ">
            <h2 className="text-3xl font-bold text-black">Packages</h2>

            <p className="text-gray-700 text-sm md:text-lg text-center ">
              Discover our handpicked travel packages for unforgettable
              experiences around the world.
            </p>

            <div className="mt-6 flex md:flex-row flex-col flex-wrap gap-8 ">
              

              {searchData ? searchData.map(packag =><div className="rounded-lg flex flex-col items-start bg-gray-200 w-[100vw] md:w-[45vw] lg:w-[25vw] px-6">
                <img src={packag.packageImage} alt="" />
                <div className="p-4 flex flex-col items-start gap-3">
                  <h2 className="text-lg font-bold text-black">
                    {packag.title}
                  </h2>
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-1 w-[14vw]">
                      <p className="text-gray-700 text-sm">Price</p>
                      <h1 className="text-blue-800 text-2xl font-bold">{packag.price}</h1>
                    </div>
                    <Link to={`${packag.packageurl}`} className="bg-blue-600 text-white rounded-xl text-sm  h-10 w-32 text-center pt-3">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div> ) : packageData?.packag.map((packag, index) => (
              <div className="rounded-lg flex flex-col items-start bg-gray-200  px-6 w-[100vw] md:w-[45vw] lg:w-[25vw]">
              <img src={packag.packageImage} alt="" />
              <div className="p-4 flex flex-col items-start gap-3">
                <h2 className="text-lg font-bold text-black">
                {packag.title}
                </h2>
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-1 w-[50vw] md:w-[14vw]">
                    <p className="text-gray-700 text-sm">Price</p>
                    <h1 className="text-blue-800 text-2xl font-bold">{packag.price}</h1>
                  </div>
                  <Link to={`${packag.packageurl}`}  className="bg-blue-600 text-white rounded-xl text-sm  h-10 w-32 text-center pt-3">
                    Book Now
                  </Link>
                </div>
              </div>
            </div> ))
            }


              

              
            </div>
          </div>


          {/* need help */}
                              <div className="w-full lg:w-[80vw] flex md:flex-row flex-col px-6 lg:px-0 items-center gap-6 mt-32 rounded-lg lg:ml-4 bg-gray-100 shadow-md">
                                <img
                                  src="https://images.pexels.com/photos/326576/pexels-photo-326576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                  className="md:w-[40vw] lg:w-[60vh] w-full h-[35vh] md:h-[40vh] lg:h-[50vh] rounded-l-xl"
                                  alt=""
                                />
                                <div className="flex-col items-start gap-3">
                                  <h1 className="text-black text-xl font-bold">Need More Help?</h1>
                                  <p className="text-gray-600 text-lg">
                                    If you couldn't find the answer to your question, our customer
                                    support team is ready to assist you with any inquiries about our
                                    travel packages.
                                  </p>
                    
                                  <div className=" mt-4 flex flex-col gap-3 items-start">
                                    <div className="flex items-center gap-2">
                                      <div className="rounded-full w-10 h-10 items-center bg-blue-400 flex justify-center ">
                                        <IoIosCall className="items-center" />
                                      </div>
                                      <div className="flex flex-col gap-1">
                                        <p className="text-gray-600 text-sm">Call us at</p>
                                        <p className="text-black text-lg">{otherData?.number}</p>
                                      </div>
                                    </div>
                    
                                    <div className="flex items-center gap-2">
                                      <div className="rounded-full w-10 h-10 items-center bg-blue-400 flex justify-center ">
                                        <MdEmail className="items-center" />
                                      </div>
                                      <div className="flex flex-col gap-1">
                                        <p className="text-gray-600 text-sm">Email us at</p>
                                        <p className="text-black text-lg">
                                        {otherData?.email}
                                        </p>
                                      </div>
                                    </div>
                    
                                    <div className="flex items-center gap-2">
                                      <div className="rounded-full w-10 h-10 items-center bg-blue-400 flex justify-center ">
                                        <FaRocketchat className="items-center" />
                                      </div>
                                      <div className="flex flex-col gap-1">
                                        <p className="text-gray-600 text-sm">Live Chat</p>
                                        <p className="text-black text-lg">Available 24/7</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-10 flex gap-2 items-center">
                                    <h2 className="text-blue-600 text-lg font-bold">Contact Us</h2>
                                    <FaArrowRight className="text-blue-600" />
                                  </div>
                                </div>
                              </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TravelBookingPage;
