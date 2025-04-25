import { Link, useParams } from "react-router-dom";
import Navbar from "./../components/Navbar";
import React, { useEffect } from "react";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import { useFetch } from "../hooks/userFetch";
import { getEnv } from "../helpers/getEnv";
import moment from "moment";
import { decode } from "entities";
import CommentList from "../components/CommentList";
import CommentCount from "../components/CommentCount";
import LikeCount from "../components/LikeCount";
import { Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import UserIcon from "../components/UserIcon";
import { useLocation } from 'react-router-dom';
import AddsSlot from "../components/AddsSlot";
import { FaBackspace } from "react-icons/fa";

function SinglePostPage() {
  const user = useSelector((state) => state.user);

  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      // Remove the `#` and get the element
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        // Smooth scroll to the element
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]); 

  
  
  const { post } = useParams();

  // Call useFetch at the top level
  const { data: singleblog, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog/${post}`,
    {
      method: "get",
      credentials: "include",
    }
  );

  const {data: categoryData} = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`,{
    method : 'get',
    credentials: 'include'
  })

  const categories = categoryData?.category;
  
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!singleblog || !singleblog.blog) {
    return <div>Blog not found.</div>;
  }

  

  return (
    <div className="md:px-0 lg:px-16 xl:px-0 ">
      <Navbar />

      <div className="lg:px-32 px-3 md:px-3 flex flex-col gap-8 mt-10">
        
        <div className="flex md:flex-row flex-col justify-center items-center gap-8">
          <div className=" lg:w-3/5 flex flex-col gap-8">

            <Link to={-1}><FaBackspace className="w-8 h-8"/></Link>
            <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
              {singleblog.blog.title || "Untitled Blog"}
            </h1>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>Written by</span>
              <Link className="text-blue-800 font-semibold">
                {singleblog.blog.author || "Unknown Author"}
              </Link>
              <span>on</span>
              <Link className="text-blue-800 font-semibold">
                {singleblog.blog.category?.name || "Uncategorized"}
              </Link>
              <span>
                {moment(singleblog.blog.createdAt).format("DD-MM-YYYY") || "N/A"} ago
              </span>
              
            </div>
            {singleblog?.blog.status === "pending" ? <div className="flex items-center gap-4">
              <h2 className="font-semibold text-gray-700 text-lg">Status : </h2>
              <div className="bg-red-400 px-6 rounded-3xl ">{singleblog?.blog.status}</div>
            </div> : <div className="flex items-center justify-start gap-6">
                
                <LikeCount props={{blogid: singleblog.blog._id}} />
              </div>}
          </div>
          <div className="md:w-2/5 w-full">
            <img
              src={singleblog.blog.featuredimage || "/placeholder-image.jpg"}
              alt="Featured"
              className="rounded-xl w-full h-80 bg-cover"
            />
          </div>
        </div>

        {/* content */}
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* text */}
          <div className="lg:w-[82%] lg:text-lg flex flex-col gap-6 text-justify">
            <div className="text-justify"
              dangerouslySetInnerHTML={{
                __html: decode(singleblog.blog.blogcontent || ""),
              }}
            ></div>

            <div className="">
                  <AddsSlot/>
                  </div>

            {singleblog?.blog.status === 'pending' ? <></> : <div id="comment" className="border-gray-600 border-t mt-5 pt-5">
              <Comment props={{blogid:singleblog.blog._id}} />
            </div>}

            
          </div>
          {/* menu */}

          <div className="px-4 h-max sticky top-24 lg:w-[18%]">
            <h1 className="mt-8 mb-4 text-lg font-medium">Author</h1>
            <div className="flex items-center gap-3">
              <img
                src={singleblog.blog.authorimage || "/placeholder-avatar.jpg"}
                alt="Author"
                className="w-12 h-12 rounded-full object-cover"
              />
              <Link className="text-blue-800 font-semibold">
                {singleblog.blog.author || "Unknown Author"}
              </Link>
            </div>
            <p className="text-sm text-gray-700 mt-5 ">
              {/* Add author bio or description here */}
            </p>

            <h1 className="mt-8 mb-4 text-lg font-medium">Categories</h1>
            <div className="flex flex-col gap-2 text-sm">
              {categories && categories.length > 0 ? categories.map(category => <Link className="underline">{category.name}</Link> ): <></>}
              
              
            </div>
          </div>
        </div>
      </div>

      <div className="-mb-5 ">
        <Footer />
      </div>
    </div>
  );
}

export default SinglePostPage;