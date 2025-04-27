import React from "react";
import Footer from "../components/Footer";
import { useState } from "react";
import BlogHome from "../components/BlogHome";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import UserIcon from "../components/UserIcon";
import { useFetch } from "../hooks/userFetch";
import { getEnv } from "../helpers/getEnv";

function VideosPage() {
  const [previewImage, setPreviewImage] = useState(null);
  const user = useSelector((state) => state.user);

 

  let {
    data: videoData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/video/get-all`, {
    method: "get",
    credentials: "include",
  });
  console.log(videoData?.video.length);

  return (
    <div className="flex flex-col min-h-screen">
     {user?.isLoggedIn && <UserIcon/>}
      <div className="w-full ">
        <div className="overflow-hidden bg-gradient-to-b from-[#4b55678b] to-[#1a1c208b] bg-opacity-5 h-[25vh] lg:h-[33vh]">
          <img
            src="https://images.pexels.com/photos/88476/pexels-photo-88476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="w-full h-[34vh] lg:h-[50vh] absolute top-0 -z-10 bg-cover "
          />
          {/* breadcrumb */}
          <div className="h-[20vh] flex flex-col justify-center">
            {/* introduction */}
            <div className="lg:px-32 flex items-center justify-between">
              <div className="mt-10 md:mt-40 md:px-6 px-6 md:w-[60vw]">
                <h1 className=" text-white text-2xl md:text-4xl lg:text-5xl font-bold">
                  Discover My Travel Videos
                </h1>
                <p className="text-gray-100 text-lg mt-6">
                  Some videos of travel
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:px-32 w-full mt-20 px-4">
          <div className="md:px-5  md:flex-1 md:flex-row flex-col flex items-center justify-between flex-wrap ">
            
                {
                    videoData && videoData?.video.length > 0 ? videoData?.video.map(video=>(
                        <div key={video?._id} className="flex flex-col items-center justify-center gap-2 w-full md:px-0 px-4 md:w-[30vw] lg:w-[39vw] mb-10">
                  <Link >
                    {" "}
                    <video
                        controls
                        className="w-[90vw] md:w-[39vw] h-auto rounded-lg shadow-lg shadow-black"
                    >
                        <source
                            src={video?.video ? video?.video : video?.videolink}
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                  </Link>

                  <h1 className="font-bold text-black text-base hover:text-gray-600 mt-5 text-center">
                    {video?.title}
                  </h1>

                  <div className="w-[30vw] h-1 bg-blue-600 rounded-full mb-2"></div>

                  

                  
                </div>
                    )) :<></>
                }

                
                
             
          </div>
        </div>
      </div>

      <div className="mb-20">
        <BlogHome />
      </div>

      <Footer />
    </div>
  );
}

export default VideosPage;
