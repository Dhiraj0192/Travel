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
  


  // Helper function to extract YouTube ID from various URL formats
const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

  return (
    <div className="flex flex-col min-h-screen">
     {user?.isLoggedIn && <UserIcon/>}
      <div className="w-full ">
        <div className="overflow-hidden bg-gradient-to-b from-[#4b55678b] to-[#1a1c208b] bg-opacity-5 h-[25vh] lg:h-[33vh]">
          <img
            src="https://images.pexels.com/photos/88476/pexels-photo-88476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="w-full h-[37vh] lg:h-[54vh] absolute top-0 -z-10 bg-cover "
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
        <div className="md:px-5 md:flex-1 md:flex-row flex-col flex items-center justify-between flex-wrap">
          {videoData &&
            videoData?.video.length > 0 &&
            videoData?.video.map((video) => {
              const isYouTube = video?.videolink?.includes('youtube.com') || 
                              video?.videolink?.includes('youtu.be');
              const videoId = isYouTube ? getYouTubeId(video.videolink) : null;
              const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

              return (
                <div key={video?._id} className="flex flex-col items-center justify-center gap-2 w-full md:px-0 px-4 md:w-[30vw] lg:w-[39vw] mb-10">
                  {video?.videolink ? (
                    <div className="relative w-[90vw] md:w-[39vw]">
                      {isYouTube && embedUrl ? (
                        <iframe
                          src={embedUrl}
                          className="w-full aspect-video rounded-lg shadow-lg shadow-black"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <a href={video.videolink} target="_blank" rel="noopener noreferrer">
                          <video
                            controls
                            className="w-full aspect-video rounded-lg shadow-lg shadow-black"
                          >
                            <source src={video.videolink} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </a>
                      )}
                    </div>
                  ) : (
                    <video
                      controls
                      className="w-[90vw] md:w-[39vw] h-auto rounded-lg shadow-lg shadow-black"
                    >
                      <source src={video?.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}

                  <a href={video?.videolink || video?.video} target="_blank" rel="noopener noreferrer">
                    <h1 className="font-bold text-black text-base hover:text-gray-600 mt-5 text-center">
                      {video?.title}
                    </h1>
                  </a>

                  <div className="w-[30vw] h-1 bg-blue-600 rounded-full mb-2"></div>
                </div>
              );
            })}
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
