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

function HomePage() {
  return (
    <div className="mt-0 flex flex-col items-center rounded-3xl justify-center">
      {/* breadcrumb */}
      <div className=" border-x-2 w-full h-[85vh] overflow-hidden shadow-lg shadow-blue-600 blur-sm">
        <video className="videoTag -z-20 w-full  " autoPlay loop muted>
          <source src="2146396-uhd_3840_2160_30fps.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="flex gap-4 z-20 absolute top-52 ml-10 text-center" >
        <div className="flex items-center justify-between">
          <div className="w-[62vw] text-xl">
            <Link to="/" className="font-bold">
              Home
            </Link>
            <span className="font-bold"> . </span>
            <span className="text-blue-800 font-bold">Traveller's Mirror</span>
          </div>
          
        </div>
      </div>
      {/* introduction */}
      <div className="flex flex-col items-center justify-between z-20 absolute top-72 ml-10">
        <div className=" w-[60vw]">
          <h1 className="text-black text-2xl md:text-5xl lg:text-5xl font-bold">
            Share Your Story With The World
          </h1>
          <p className="mt-8 text-md md:text-xl font-semibold">
            Create, publish and connect with readers on our modern blogging
            platform. Simple to use, powerful to grow your audience.
          </p>
        </div>
        <Link to="write" className="hidden md:block relative"></Link>
        <div className="mt-9 text-white">
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
                <textPath href="#circlePath" startOffset="0%"
                className="font-bold text-white"
                >
                  Write your story .
                </textPath>
                <textPath href="#circlePath" startOffset="50%"
                className="font-bold"
                >
                  Share your idea .
                </textPath>
              </text>
            </svg>
            <button className="absolute top-56 ml-10 w-24 h-24 bg-blue-800 rounded-full flex items-center justify-center">
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
      </div>

      <Destination/>

      <FeaturedPosts />

      <MainCategories />

      <UserSay/>

      <CTASection/>
      

      <Footer />
    </div>
  );
}

export default HomePage;
