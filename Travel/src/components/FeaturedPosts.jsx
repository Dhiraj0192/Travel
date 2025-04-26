import React, { useState } from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useFetch } from "../hooks/userFetch";
import { getEnv } from "../helpers/getEnv";
import moment from "moment";
import { Lectern } from "lucide-react";

function FeaturedPosts({ lineBar = true , selectedCategoryBlogs, searchData }) {
    console.log(selectedCategoryBlogs);

      const [limit, setLimit] = useState(9)
      const [sort, setSort] = useState('-createdAt'); 
      
      const categoryId  = 'Travel';
      
        
      let {data} = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/blog/travelcategory/${categoryId}?limit=${limit}&sort=${sort}`,{
        method : 'get',
        credentials: 'include'
    })
    console.log(data?.blogs);
    if (selectedCategoryBlogs != undefined) {
      data = []
    }
    
    
  return (
    <div className=" mb-28 rounded-t-3xl">
      {lineBar ? <div className=" w-full md:w-[50vw] mt-16 h-2 mb-20 "></div> : ""}

      {lineBar ? (
        <h1 className="text-4xl font-bold text-center mb-16">
          Recent Blogs and Ariticles
        </h1>
      ) : (
        ""
      )}
      <div className="lg:px-32 px-3 -mt-8 flex flex-col lg:flex-row gap-8 backdrop-blur-sm pt-10 ">
        <div className="w-full flex md:flex-row flex-col md:flex-wrap gap-4 flex-1">

            {searchData ? searchData.map((blog, index) =><div key={blog._id} className="w-full md:w-[40vw]">
                  <div className="flex  justify-between gap-4 bg-white/30 ">
                  <Link className="rounded-xl object-cover w-1/2
                          shadow-2xl aspect-video" to={`/blog/${blog.category.slug}/${blog.slug}`}> <img
                      src={blog.featuredimage}
                      className="rounded-xl"
                    /></Link>
                    <Link to={`/blog/${blog.category.slug}/${blog.slug}`}></Link>
                    <div className="w-2/3 flex flex-col gap-3">
                      <div className="flex items-center gap-4 text-sm lg:text-base ">
                        <h1 className="font-semibold">{index +1}.</h1>
                        <Link className="text-blue-800">
                        {blog.category.name}</Link>
                        <span className="text-gray-500 text-sm">{moment(blog?.createdAt).format("DD-MM-YYYY")}</span>
                      </div>
                      <Link
                        to={`/blog/${blog.category.slug}/${blog.slug}`}
                        className="text-base sm:text-lg md:text-md lg:text-xl xl:text-xl font-medium cursor-pointer"
                      >
                        {blog.title}
                      </Link>
                      <Link to={`/blog/${blog.category.slug}/${blog.slug}`}><p className="text-blue-600 text-sm font-bold "> Read... </p></Link>
                    </div>
                  </div>
                </div>) :
              data && Array.isArray(data?.blogs) ? data?.blogs.map((blog , index) => 
                <div key={blog._id} className="w-full md:w-[40vw]">
                  <div className="flex  justify-between gap-4 bg-white/30 ">
                  <Link className="rounded-xl object-cover w-1/2
                          shadow-2xl aspect-video" to={`/blog/${blog.category.slug}/${blog.slug}`}> <img
                      src={blog.featuredimage}
                      className="rounded-xl"
                    /></Link>
                    <div className="w-2/3 flex flex-col gap-3">
                      <div className="flex items-center gap-4 text-sm lg:text-base ">
                        <h1 className="font-semibold">{index +1}.</h1>
                        <Link className="text-blue-800">
                        {blog.category?.name}</Link>
                        <span className="text-gray-500 text-sm">{moment(blog?.createdAt).format("DD-MM-YYYY")}</span>
                      </div>
                      <Link
                        to={`/blog/${blog.category?.slug}/${blog.slug}`}
                        className="text-base sm:text-lg md:text-sm lg:text-xl xl:text-xl font-medium cursor-pointer"
                      >
                        {blog.title}
                      </Link>
                      <Link to={`/blog/${blog.category?.slug}/${blog.slug}`}><p className="text-blue-600 text-sm font-bold "> Read... </p></Link>
                    </div>
                  </div>
                </div>)
                
                :

                selectedCategoryBlogs && selectedCategoryBlogs.map((blog , index) => 
                <div key={blog._id} className="w-full md:w-[40vw]">
                <div className="flex  justify-between gap-4 bg-white/30 ">
                <Link className="rounded-xl object-cover w-1/2
                          shadow-2xl aspect-video" to={`/blog/${blog.category.slug}/${blog.slug}`}> <img
                      src={blog.featuredimage}
                      className="rounded-xl"
                    /></Link>
                  <div className="w-2/3 flex flex-col gap-3">
                    <div className="flex items-center gap-4 text-sm lg:text-base ">
                      <h1 className="font-semibold">{index +1}.</h1>
                      <Link className="text-blue-800">
                      {blog.category?.name}</Link>
                      <span className="text-gray-500 text-sm">{moment(blog?.createdAt).format("DD-MM-YYYY")}</span>
                    </div>
                    <Link
                      to={`/blog/${blog.category?.slug}/${blog.slug}`}
                      className="text-base sm:text-lg md:text-sm lg:text-xl xl:text-xl font-medium cursor-pointer"
                    >
                      {blog.title}
                    </Link>
                    <Link to={`/blog/${blog.category?.slug}/${blog.slug}`}><p className="text-blue-600 text-sm font-bold "> Read... </p></Link>
                    
                  </div>
                </div>
              </div>) 
              
            
              
              
            }
          


          

          

        </div>
      </div>
    </div>
  );
}

export default FeaturedPosts;
