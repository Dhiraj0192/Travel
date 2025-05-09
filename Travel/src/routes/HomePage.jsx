import React, { useState, useEffect } from "react";
import Skeleton from "../components/Skeleton";
import { Link } from "react-router-dom";
import { InteractiveHoverButton } from "../components/magicui/interactive-hover-button";
import UserSay from "../components/UserSay";
import CTASection from "../components/CTAsection";
import Footer from "../components/Footer";
import PopularCategories from "../components/PopularCategories";
import RecentBlogs from "../components/RecentBlogs";
import Partners from "../components/Partners";


function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-0 flex flex-col items-center rounded-3xl justify-center ">
      
      <div className=" w-full h-[57vh] md:h-[40vh] lg:h-[78vh] overflow-hidden bg-gradient-to-b from-[#455165eb] to-[#0101018b] bg-opacity-5">
        <img
          src="/pexels-fmaderebner-238622.jpg" // Ensure the path is correct
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-100 w-full absolute top-0 -z-10 h-[69vh] md:h-[46vh] lg:h-[98vh]"
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
        <div className=" mt-10 flex flex-col md:flex-row gap-4">
          <Link to="/write-blog"><InteractiveHoverButton className="px-10 py-2">Write a blog?</InteractiveHoverButton></Link>

          <Link to="/blogs">
          <InteractiveHoverButton className="px-10 py-2">Browse Blogs</InteractiveHoverButton>
          </Link>
        
        
        
        </div>
      </div>

      <div className=" ">
       
          <PopularCategories />
       

        {loading ? (
          <Skeleton type="recentBlogs" />
        ) : (
          <RecentBlogs />
        )}

        <Partners/>

        <UserSay />

        

        <CTASection />
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
