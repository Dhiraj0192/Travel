import React from "react";
import Footer from "../components/Footer";
import  { useState } from "react";
import BlogHome from "../components/BlogHome";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function GalleryPage() {
    const [previewImage, setPreviewImage] = useState(null);
    const user = useSelector((state) => state.user);
    
    
  
    // Protect the /single page route
    if (!user.isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
return (
    <div className="flex flex-col min-h-screen">
        <div className="w-full ">
            <div className="overflow-hidden bg-gradient-to-b from-[#4b55678b] to-[#1a1c208b] bg-opacity-5 h-[30vh]">
                <img
                    src="https://images.pexels.com/photos/5077049/pexels-photo-5077049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    className="w-full h-[40vh] absolute top-0 -z-10 bg-cover "
                />
                {/* breadcrumb */}
                <div className="h-[20vh] flex flex-col justify-center">
                    {/* introduction */}
                    <div className="lg:px-32 flex items-center justify-between">
                        <div className="mt-40 w-[60vw]">
                            <h1 className=" text-white text-xl md:text-5xl lg:text-5xl font-bold">
                                Discover My Gallery Travel
                            </h1>
                            <p className="text-gray-100 text-lg mt-6">
                                Some pictures of travel
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:px-32 w-full mt-20 mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[
                        "https://images.pexels.com/photos/1231231/pexels-photo-1231231.jpeg",
                        "https://images.pexels.com/photos/2342342/pexels-photo-2342342.jpeg",
                        "https://images.pexels.com/photos/3453453/pexels-photo-3453453.jpeg",
                        
                        "https://images.pexels.com/photos/6786786/pexels-photo-6786786.jpeg",
                        "https://images.pexels.com/photos/1231231/pexels-photo-1231231.jpeg",
                        "https://images.pexels.com/photos/2342342/pexels-photo-2342342.jpeg",
                        "https://images.pexels.com/photos/3453453/pexels-photo-3453453.jpeg",
                        
                        "https://images.pexels.com/photos/6786786/pexels-photo-6786786.jpeg",
                        "https://images.pexels.com/photos/1231231/pexels-photo-1231231.jpeg",
                        "https://images.pexels.com/photos/2342342/pexels-photo-2342342.jpeg",
                        "https://images.pexels.com/photos/3453453/pexels-photo-3453453.jpeg",
                        
                        "https://images.pexels.com/photos/6786786/pexels-photo-6786786.jpeg",
                        "https://images.pexels.com/photos/1231231/pexels-photo-1231231.jpeg",
                        "https://images.pexels.com/photos/2342342/pexels-photo-2342342.jpeg",
                        "https://images.pexels.com/photos/3453453/pexels-photo-3453453.jpeg",
                        
                        "https://images.pexels.com/photos/6786786/pexels-photo-6786786.jpeg",
                        "https://images.pexels.com/photos/1231231/pexels-photo-1231231.jpeg",
                        "https://images.pexels.com/photos/2342342/pexels-photo-2342342.jpeg",
                        "https://images.pexels.com/photos/3453453/pexels-photo-3453453.jpeg",
                        
                        "https://images.pexels.com/photos/6786786/pexels-photo-6786786.jpeg",
                        "https://images.pexels.com/photos/1231231/pexels-photo-1231231.jpeg",
                        "https://images.pexels.com/photos/2342342/pexels-photo-2342342.jpeg",
                        "https://images.pexels.com/photos/3453453/pexels-photo-3453453.jpeg",
                        
                        "https://images.pexels.com/photos/6786786/pexels-photo-6786786.jpeg",
                    ].map((src, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
                            onClick={() => setPreviewImage(src)}
                        >
                            <img
                                src={src}
                                alt={`Gallery Image ${index + 1}`}
                                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {previewImage && (
            <div
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                onClick={() => setPreviewImage(null)}
            >
                <img
                    src={previewImage}
                    alt="Preview"
                    className="max-w-full max-h-full"
                />
            </div>
        )}

        <div className="mb-20">
        <BlogHome />
        </div>

        <Footer />
    </div>
);


}

export default GalleryPage;
