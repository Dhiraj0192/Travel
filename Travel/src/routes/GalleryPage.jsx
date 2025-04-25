import React from "react";
import Footer from "../components/Footer";
import  { useState } from "react";
import BlogHome from "../components/BlogHome";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import UserIcon from "../components/UserIcon";
import { useFetch } from "../hooks/userFetch";
import { getEnv } from "../helpers/getEnv";

function GalleryPage() {
    const [previewImage, setPreviewImage] = useState(null);
    const user = useSelector((state) => state.user);
    
    
  
    // Protect the /single page route
    if (!user.isLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    let {
        data: blogData,
        loading,
        error,
      } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-all`, {
        method: "get",
        credentials: "include",
    });
    console.log(blogData);
    
return (
    <div className="flex flex-col min-h-screen">
        <UserIcon/>
        <div className="w-full ">
            <div className="overflow-hidden bg-gradient-to-b from-[#4b55678b] to-[#1a1c208b] bg-opacity-5 h-[25vh] lg:h-[33vh]">
                <img
                    src="https://images.pexels.com/photos/5077049/pexels-photo-5077049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    className="w-full h-[32vh] lg:h-[50vh] absolute top-0 -z-10 bg-cover "
                />
                {/* breadcrumb */}
                <div className="h-[20vh] flex flex-col justify-center">
                    {/* introduction */}
                    <div className="lg:px-32 flex items-center justify-between">
                        <div className="md:mt-40 md:px-6 px-6 md:w-[60vw]">
                            <h1 className=" text-white text-2xl md:text-4xl lg:text-5xl font-bold">
                                Discover My Gallery Travel
                            </h1>
                            <p className="text-gray-100 text-lg mt-6">
                                Some pictures of travel
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:px-32 w-full mt-20 mb-10 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {blogData && blogData?.blog.map((blog, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
                            onClick={() => setPreviewImage(src)}
                        >
                             <Link to={`/blog/${blog.category.slug}/${blog.slug}`}>
                            <img
                                src={blog.featuredimage}
                                alt={`Gallery Image ${index + 1}`}
                                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                            />
                            </Link>
                        </div>
                    ))}
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

export default GalleryPage;
