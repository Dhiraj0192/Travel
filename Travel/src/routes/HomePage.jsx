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
import { useFetch } from "../hooks/userFetch";
import { getEnv } from "../helpers/getEnv";
import Marquee from "react-fast-marquee";
import { cn } from "../lib/utils";


function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  const {
        data: newsData,
        
      } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-all-flah-news`, {
        method: "get",
        credentials: "include",
      });

      const ReviewCard = ({
          
          name,
          slug
        }) => {
          return (
            <figure
              className={cn(
                "relative cursor-pointer overflow-hidden rounded-xl border p-4 bg-gray-200",
               
              )}
            >
              <div className="flex flex-row items-center gap-2 ">
                <div className="w-4 h-4 rounded-full bg-red-800"></div>
                <div className="flex flex-col">
                  <figcaption className="text-sm font-medium dark:text-white">
                  <Link to={`/blog/${slug}/${slug}`}>
                    {name}
                  </Link>
                  </figcaption>
                 
                </div>
              </div>
            
            </figure>
          );
        };
  

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

      {newsData && newsData?.blog?.length > 0 && <div className="lg:px-20 mt-6 -mb-16">
      <div className="relative flex w-[90vw] bg-slate-300 flex-col items-center justify-center overflow-hidden">
      <Marquee speed={50} 
      gradient={false}
      pauseOnHover={true}>
        <div className="w-full flex gap-3 items-center">
          {newsData?.blog.map((blog) => (
          <ReviewCard key={blog._id} name={blog?.title} slug={blog?.slug}/>
        ))}
        </div>
        
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      
      </div>

      
      </div>}

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
