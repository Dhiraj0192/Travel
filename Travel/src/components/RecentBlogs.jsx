import React from 'react'
import { Button } from './ui/button'
import { useFetch } from '../hooks/userFetch';
import { getEnv } from '../helpers/getEnv';
import { decode } from 'html-entities';
import truncate from 'html-truncate';
import { Link } from 'react-router-dom';
import { convert } from 'html-to-text';


function RecentBlogs() {
    const MAX_LENGTH = 150; // Character limit
      let {
        data: blogData,
        loading,
        error,
      } = useFetch(
        `${getEnv("VITE_API_BASE_URL")}/dashboard/get-all`,
        {
          method: "get",
          credentials: "include",
        }
      );

      const plainText = (blogcontent) => convert(decode(blogcontent || ""), {
        wordwrap: false, 
        preserveNewlines: false, 
      });


  return (
    <div className='lg:px-32 flex flex-col w-full mt-20 bg-[url(public/346596-PAQ0SL-281.jpg)] bg-cover bg-no-repeat pt-10 pb-10'>
        <div className="flex items-center justify-between backdrop-blur-md">
            <div className="w-[28vw] h-1 bg-gray-300"></div>
            <h1 className="text-2xl lg:text-4xl font-bold text-black">
                Recent Blogs
            </h1>
            <div className="w-[28vw] h-1 bg-gray-300"></div>
        </div>

        <div className="mt-16 backdrop-blur-md">

            <div className="flex flex-col md:flex-row  items-center justify-between flex-wrap w-full ">

                {blogData && Array.isArray(blogData?.blog)
              ? blogData?.blog.map((blog, index) => (<div className="flex flex-col items-center justify-center gap-2 px-8 md:px-0 md:w-[26vw] mb-10">
                
                <Link to={`/blog/${blog.category.slug}/${blog.slug}`}> <img src={blog.featuredimage} alt="" srcset="" className='lg:w-[26vw] lg:h-[30vh] rounded-lg'/> 
                   </Link>

                <h1 className="font-bold text-black text-base hover:text-gray-600 mt-1">{blog.title}</h1>

                <div className="w-[10vw] h-1 bg-blue-600 rounded-full mb-2"></div>

                <p className="text-gray-700 text-sm text-center mg:w-[26vw]" >{plainText(blog.blogcontent).substring(0, 100).trim() + (plainText.length > 100 ? '...' : '')}</p>
                

                <div className="mt-4">
                    <Link to={`/blog/${blog.category.slug}/${blog.slug}`}><p className="text-white text-sm font-bold bg-blue-600 px-4 py-2 rounded-md"> Read More... </p>
                   </Link>
                </div>
            </div>)):<></>}

                

                

                
            </div>

            

        </div>

    </div>
  )
}

export default RecentBlogs