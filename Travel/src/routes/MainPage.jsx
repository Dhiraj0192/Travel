import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import PostList from "../components/PostList";
import Footer from "../components/Footer";
import ReadyBlog from "../components/ReadyBlog";
import { FaCheckCircle } from "react-icons/fa";
import Image from "../components/Image";
import FeaturedPosts from "../components/FeaturedPosts";
import BlogHome from "../components/BlogHome";
import { useFetch } from "../hooks/userFetch";
import { getEnv } from "../helpers/getEnv";
import moment from "moment";
import { convert } from 'html-to-text';
import { decode } from "entities";
import { useSelector } from "react-redux";

function MainPage() {
  const user = useSelector((state) => state.user);

  // Protect the /single page route
  if (!user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [timeRange, setTimeRange] = useState('week');
  const [limit, setLimit] = useState(9);
  const [selectedCategoryBlogs, setSelectedCategoryBlogs] = useState();
  const [query, setQuery] = useState();
    let [searchData , setSearchData] = useState();
    const {data: categoryData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`,{
      method : 'get',
      credentials: 'include'
    })

    const {data: blogData} = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/trending?limit=${limit}&timeRange=${timeRange}`,{
      method : 'get',
      credentials: 'include'
    })

    // setTrendingBlogs(blogData);
    console.log(blogData);
    

    const categories = categoryData?.category;

    const fetchBlogsByCategory = async (categoryId) => {
      try {
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/category/blogs/${categoryId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (response.ok) {
          setSelectedCategoryBlogs(data.blogs);
          setSearchData(undefined);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching blogs by category:", error);
      }
    };

    const plainText = (blogcontent) => convert(decode(blogcontent || ""), {
            wordwrap: false, 
            preserveNewlines: false, 
    });

    // search
    
      const getInput = (e) => {
        setQuery(e.target.value);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(query);
    
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/blog/search/${query}`,
          {
            method: "get",
            credentials: "include",
          }
        );
    
        const data = await response.json();
        if (data?.blog.length > 0) {
          setSearchData(data?.blog)
        }
        
      };

  return (
    <div className=" flex flex-col ">
      <div className="w-full h-[63vh] overflow-hidden bg-gradient-to-b from-[#879cbf8b] to-[#1a1c208b] bg-opacity-5">
        <img
          src="/bucketlist.jpg"
          className="w-full h-[74vh] absolute top-0 -z-10 bg-cover "
        />
        {/* breadcrumb */}
        <div className="h-96 flex flex-col justify-center mt-20 ">
          <div className="flex gap-4 lg:px-32 text-white ">
            <Link to="/home" className="text-xl">
              Home
            </Link>
            <span className="text-xl text-white">.</span>
            <span className="text-white text-xl">Blogs and Articles</span>
          </div>
          {/* introduction */}
          <div className="lg:px-32 flex items-center gap-10">
          <Link to="/write-blog" className="">
            <svg
              viewBox="0 0 200 200"
              width="170"
              height="200"
              className="text-xl font-bold tracking-widest animate-spin animatedButton -ml-3 text"
            >
              <path
                id="circlePath"
                d="M 100, 100 m -75, 0 a 75,75 0 1, 1 150,0 a 75, 75 0 1,1 -150,0"
                fill="none"
              />
              <text>
                <textPath fill="white" href="#circlePath" startOffset="0%">
                  Write your story .
                </textPath>
                <textPath fill="white" href="#circlePath" startOffset="50%">
                  Share your idea .
                </textPath>
              </text>
            </svg>
            
            <button className="absolute top-80 left-40 w-24 h-24 bg-blue-800 rounded-full flex items-center justify-center">
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
            </Link>
            <div className=" w-[60vw]">
              <h1 className="text-white text-2xl md:text-5xl lg:text-5xl font-bold">
                Share your content, engage with readers, and grow audience.
              </h1>
              <p className="mt-8 text-md md:text-xl text-white">
                Our intuitive editor makes it easy to express yourself with
                text, images, and multimedia.
              </p>
            </div>
            
          </div>
        </div>
      </div>

      

      <div className=" bg-[url(public/346596-PAQ0SL-281.jpg)] bg-cover bg-no-repeat pb-20 rounded-t-3xl">
        <div className="lg:px-32 pt-5 pb-10">
          <div className="hidden md:flex bg-gray-400 rounded-3xl xl:rounded-full p-4 shadow-xl items-center justify-center gap-8 mt-10">
            <div className="flex-1 flex items-center justify-between flex-wrap">
              {categories && categories.length > 0 ? categories.map(category => <button
                key={category._id}
                onClick={() => fetchBlogsByCategory(category._id)}
                className="bg-gray-700 hover:bg-white hover:text-black text-white rounded-full px-4 py-2"
              >
                {category.name}
              </button> ) : <></>}
              
              
              
            </div>
            <span className="text-xl font-medium">|</span>

            <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="gray"
              >
                <circle cx="10.5" cy="10.5" r="7.5" />
                <line x1="16.5" y1="16.5" x2="22" y2="22" />
              </svg>
              <form onSubmit={handleSubmit}>
                  <input
                    name="q"
                    onInput={getInput}
                    type="text"
                    placeholder="search a post..."
                    className="bg-transparent border-0 outline-none"
                  />
                </form>
            </div>
          </div>
        </div>

        <div className="mt-2 backdrop-blur-sm ">
          <FeaturedPosts lineBar={false} selectedCategoryBlogs={selectedCategoryBlogs} searchData={searchData}/>
        </div>

        

        <div className="backdrop-blur-sm ">
        <div className=" mb-16 flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold text-blue-800">Tranding Blogs</h1>
        <p className="text-gray-600">
          Discover trending content from our community of writers
        </p>
      </div>

      {/* first */}

      <div className="lg:px-32 flex-1 flex items-center justify-between flex-wrap ">

        {blogData && blogData.length > 0 ? blogData.map(blog => <div className="flex flex-col items-center justify-center gap-2 w-[26vw] mb-10">
                        <img src={blog.featuredimage} alt="" srcset="" className='w-[26vw] h-[30vh] rounded-lg'/>
        
                        <h1 className="font-bold text-black text-base hover:text-gray-600 mt-1">{blog.title}</h1>
        
                        <div className="w-[10vw] h-1 bg-blue-600 rounded-full mb-2"></div>
        
                        <p className="text-gray-700 text-sm text-center w-[26vw]" >{plainText(blog.blogcontent).substring(0, 100).trim() + (plainText.length > 100 ? '...' : '')}</p>
                        
        
                        <div className="mt-4">
                            <Link to={`/blog/${blog.category.slug}/${blog.slug}`}><p className="text-white text-sm font-bold bg-blue-600 px-4 py-2 rounded-md"> Read More... </p>
                           </Link>
                        </div>
                    </div> ): <></>}

        

       

      </div>

      
      

      <BlogHome />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MainPage;
