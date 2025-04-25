import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import PostList from "../components/PostList";
import Footer from "../components/Footer";
import ReadyBlog from "../components/ReadyBlog";
import { FaCheckCircle, FaUserSecret } from "react-icons/fa";
import Image from "../components/Image";
import FeaturedPosts from "../components/FeaturedPosts";
import BlogHome from "../components/BlogHome";
import { useFetch } from "../hooks/userFetch";
import { getEnv } from "../helpers/getEnv";
import moment from "moment";
import { convert } from 'html-to-text';
import { decode } from "entities";
import { useSelector } from "react-redux";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { GrNotes } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";
import { useEffect } from "react"

import { showToast } from "../helpers/showToast";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/user/user.slice";
 


function MainPage() {
  
  const user = useSelector((state) => state.user);

  // Protect the /single page route
  if (!user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [timeRange, setTimeRange] = useState('month');
  const [limit, setLimit] = useState(9);
  const [selectedCategoryBlogs, setSelectedCategoryBlogs] = useState();
  const [query, setQuery] = useState();
  const navigate = useNavigate();
  const dispath = useDispatch()
    let [searchData , setSearchData] = useState();
    const {data: categoryData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`,{
      method : 'get',
      credentials: 'include'
    })

    const { data: HeroData } = useFetch(
              `${getEnv("VITE_API_BASE_URL")}/herosection/`,
              {
                method: "get",
                credentials: "include",
              },
              
          );
      console.log(HeroData);

    const {data: blogData} = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/trending?limit=${limit}`,{
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
          console.log(data);
          
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

      const handleLogout = async()=>{
          try {
                const response = await fetch(
                  `${getEnv("VITE_API_BASE_URL")}/auth/logout`,
                  {
                    method: "get",
                    
                    credentials: "include",
                    
                  }
                );
          
                const data = await response.json();
                if (!response.ok) {
                  return showToast("error", data.message);
                }
          
                dispath(removeUser())
                navigate("/");
                
              } catch (error) {
                showToast("error", error.message);
              }
        }

  return (
    <div className=" flex flex-col ">
      <DropdownMenu>
              
            
              <DropdownMenuTrigger className="fixed bottom-10 right-10 z-50 flex">
              <Avatar className="w-16 h-16 border-gray-800 border-2">
                  <AvatarImage src={user.user.avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                
                {/* <IoMdArrowDropdownCircle className="h-7 w-7 -ml-8" /> */}

              </DropdownMenuTrigger>
              <DropdownMenuContent className=" w-[18vw] min-h-[26vh] absolute bottom-0 right-10">
                <DropdownMenuLabel className="bg-gray-800 rounded-md">
                    <p className="text-blue-300 ">{user.user.name}</p>
                    <p className="text-sm text-white font-normal">
                        {user.user.email}
                    </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="text-md font-semibold mb-1 text-gray-500 hover:bg-gray-400">
                    <Link to="/account">
                    <FaUserSecret/>
                    Profile</Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild className="text-md font-semibold mb-1 text-gray-500 hover:bg-gray-400">
                    <Link to="/your-blogs">
                    <GrNotes />
                    Your Blog</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-gray-200"/>
                
                <DropdownMenuItem onClick={handleLogout} className="text-md font-semibold mb-1 text-gray-500 hover:bg-gray-200">
                <IoLogOut/>
                Log Out
                </DropdownMenuItem>
                
              </DropdownMenuContent>
            </DropdownMenu>
      <div className="w-full h-[50vh] md:h-[33vh] lg:h-[50vh] overflow-hidden bg-gradient-to-b from-[#3f4247b4] to-[#1a1c208b] bg-opacity-10">
        <img
          src={HeroData?.heroSections.featuredImage}
          className="w-full h-[74vh] absolute top-0 -z-10 bg-cover "
        />
        {/* breadcrumb */}
        <div className="lg:h-96 h-96 md:h-80 flex flex-col justify-center mt-10 md:mt-6 ">
          
          {/* introduction */}
          <div className="lg:px-32 md:px-16 flex md:flex-row flex-col items-center md:gap-10">
          <Link to="/write-blog" className="-mt-20 md:mt-0">
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
            
            <button className="absolute top-[18vh] lg:top-[40vh] left-[38vw] lg:left-40 md:left-[11vw] w-24 h-24 bg-blue-800 rounded-full flex items-center justify-center">
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
            <div className=" w-full md:px-0 px-8 md:w-[60vw]">
              <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold text-center">
                {HeroData?.heroSections.title}
              </h1>
              
            </div>
            
          </div>
        </div>
      </div>

      

      

      <div className=" bg-[url(public/346596-PAQ0SL-281.jpg)] bg-cover bg-no-repeat pb-20 ">
        <div className="lg:px-32 pt-5 pb-10 px-1 md:px-0">
          <div className=" md:flex bg-gray-400 rounded-3xl xl:rounded-full p-4 shadow-xl items-center justify-center gap-8 mt-10">
            <div className="flex-1 flex items-center justify-between flex-wrap">
              {categories && categories.length > 0 ? categories.map(category => <button
                key={category._id}
                onClick={() => fetchBlogsByCategory(category._id)}
                className="bg-gray-700 hover:bg-white hover:text-black text-white rounded-full px-4 py-2 mb-3 lg:mb-0"
              >
                {category.name}
              </button> ) : <></>}
              
              
              
            </div>
            <span className="hidden md:block text-xl font-medium">|</span>

            <div className="hidden md:flex bg-gray-100 p-2 rounded-full  items-center gap-2">
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

        <div className="mt-2 md:backdrop-blur-sm ">
          <FeaturedPosts lineBar={false} selectedCategoryBlogs={selectedCategoryBlogs} searchData={searchData}/>
        </div>

        

        <div className="backdrop-blur-sm ">
        <div className=" mb-16 flex flex-col items-center justify-center gap-6 md:px-0 px-3">
        <h1 className="text-3xl font-bold text-blue-800">Trending Blogs</h1>
        <p className="text-gray-600 text-center">
          Discover trending content from our community of traveller's
        </p>
      </div>

      {/* first */}

      <div className="md:px-5 lg:px-32 md:flex-1 md:flex-row flex-col flex items-center justify-between flex-wrap ">

        {blogData && blogData?.blogs.length > 0 ? blogData?.blogs.map(blog => <div className="flex flex-col items-center justify-center gap-2 w-full md:px-0 px-4 md:w-[30vw] lg:w-[26vw] mb-10">
          <Link to={`/blog/${blog.slug}/${blog.slug}`}> <img src={blog.featuredimage} alt="" srcset="" className='md:w-[30vw] w-full h-[30vh] rounded-lg'/>
                           </Link>
                       
        
                        <h1 className="font-bold text-black text-base hover:text-gray-600 mt-1 text-center">{blog.title}</h1>
        
                        <div className="w-[10vw] h-1 bg-blue-600 rounded-full mb-2"></div>
        
                        <p className="text-gray-700 text-sm text-center w-[26vw]" >{plainText(blog.blogcontent).substring(0, 100).trim() + (plainText.length > 100 ? '...' : '')}</p>
                        
        
                        <div className="mt-4">
                            <Link to={`/blog/${blog.slug}/${blog.slug}`}><p className="text-white text-sm font-bold bg-blue-600 px-4 py-2 rounded-md"> Read More... </p>
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
