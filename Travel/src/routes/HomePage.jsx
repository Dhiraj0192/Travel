import React from "react";
import { Link, Links } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import Features from "../components/Features";
import ReadyBlog from "../components/ReadyBlog";
import Footer from "../components/Footer";
import Destination from "../components/Destination";
import PostList from "../components/PostList";
import UserSay from "../components/UserSay";
import CTASection from "../components/CTAsection";
import Image from "../components/Image";
import PopularCategories from "../components/PopularCategories";
import RecentBlogs from "../components/RecentBlogs";
import AddsSlot from "../components/AddsSlot";

function HomePage() {
  return (
    <div className="mt-0 flex flex-col items-center rounded-3xl justify-center ">
      
      <div className=" w-full h-[55vh] lg:h-[78vh] overflow-hidden bg-gradient-to-b from-[#879cbf8b] to-[#1a1c208b] bg-opacity-5">
        <Image
          src="pexels-fmaderebner-238622.jpg"
          className="opacity-100 w-full absolute top-0 -z-10 h-[63vh] lg:h-[95vh]"
        />
      </div>
      <div className="flex gap-4 z-20 absolute top-40 ml-10 text-center">
        
      </div>
      {/* introduction */}
      <div className="flex flex-col items-center justify-between z-20 absolute top-28 lg:top-80 lg:ml-10 ">
        <div className="w-full px-6 lg:px-0 lg:w-[60vw]">
          <h1 className="text-white text-2xl md:text-5xl lg:text-5xl font-bold">
            Share Your Story With The World
          </h1>
          <p className="mt-3 lg:mt-8 text-md md:text-xl font-semibold text-white">
            Create, publish and connect with readers on our modern blogging
            platform. Simple to use, powerful to grow your audience.
          </p>
        </div>
        <Link to="/write-blog" className=" md:block relative">
        <div className="mt-3 lg:mt-10 text-white">
          
          <svg
            viewBox="0 0 200 200"
            width="170"
            height="200"
            className="text-lg text-white tracking-widest animate-spin animatedButton mr-3"
          >
            <path
              id="circlePath"
              d="M 100, 100 m -75, 0 a 75,75 0 1, 1 150,0 a 75, 75 0 1,1 -150,0"
              fill="none"
            />
            
            <text>
              <textPath
              fill="white"
                href="#circlePath"
                startOffset="0%"
                className="font-bold text-white"
              >
                Write your story .
              </textPath>
              <textPath
              fill="white"
                href="#circlePath"
                startOffset="50%"
                className="font-bold"
              >
                Share your idea .
              </textPath>
            </text>
          </svg>
          <button className="absolute top-16 lg:top-24 ml-10 w-24 h-24 bg-blue-800 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </div>
        </Link>
      </div>

      <div className=" ">
      

        {/* <Destination /> */}

        {/* <FeaturedPosts /> */}

        {/* <MainCategories /> */}
        <PopularCategories/>
        <RecentBlogs/>

        

        <UserSay />

        

        <CTASection />
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
