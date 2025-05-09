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
import { convert } from "html-to-text";
import { decode } from "entities";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { GrNotes } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";
import { useEffect } from "react";

import { showToast } from "../helpers/showToast";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/user/user.slice";
import { InteractiveHoverButton } from "../components/magicui/interactive-hover-button";
import AddsSlot from "../components/AddsSlot";
import Marquee from "react-fast-marquee";
import { cn } from "../lib/utils";

function MainPage() {
  const user = useSelector((state) => state.user);

  // Protect the /single page route
  if (!user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [timeRange, setTimeRange] = useState("month");
  const [limit, setLimit] = useState(9);
  const [selectedCategoryBlogs, setSelectedCategoryBlogs] = useState();
  const [query, setQuery] = useState();
  const navigate = useNavigate();
  const dispath = useDispatch();
  let [searchData, setSearchData] = useState();
  const [category, setCategory] = useState([]);

  const {
      data: newsData,
      
    } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-all-flah-news`, {
      method: "get",
      credentials: "include",
    });

   
    

  useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await fetch(
            `${getEnv("VITE_API_BASE_URL")}/category/tree`,
            {
              method: "get",
              credentials: "include",
            }
          );
          const data = await response.json();
          if (response.ok) {
            setCategory(data);
            
            
          } else {
            console.error("Failed to fetch categories", data.message);
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
  
      fetchCategories();
    }, []);
  
   
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


  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`, {
    method: "get",
    credentials: "include",
  });

  const {
    data: locationData,
    
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-all-location`, {
    method: "get",
    credentials: "include",
  });
  
  

  const { data: HeroData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/herosection/`,
    {
      method: "get",
      credentials: "include",
    }
  );
  

  const { data: blogData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/trending?limit=${limit}`,
    {
      method: "get",
      credentials: "include",
    }
  );

  // setTrendingBlogs(blogData);


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

  const plainText = (blogcontent) =>
    convert(decode(blogcontent || ""), {
      wordwrap: false,
      preserveNewlines: false,
    });

  // search

  const getInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    const response = await fetch(
      `${getEnv("VITE_API_BASE_URL")}/blog/search/${query}`,
      {
        method: "get",
        credentials: "include",
      }
    );

    const data = await response.json();
    if (data?.blog.length > 0) {
      setSearchData(data?.blog);
    }
  };

  const handleLogout = async () => {
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

      dispath(removeUser());
      navigate("/");
    } catch (error) {
      showToast("error", error.message);
    }
  };

  const handleLocationChange = async (event) => {
              const location = event.target.value.toString();
              const isChecked = event.target.checked;
              
              
              

              if (isChecked) {
                try {
                  const response = await fetch(
                    `${getEnv("VITE_API_BASE_URL")}/blog/getblogbylocation/${location}`,
                    {
                      method: "GET",
                      credentials: "include",
                    }
                  );

                  const data = await response.json();
                  if (response.ok) {
                    setSelectedCategoryBlogs(data.blogs);
                  } else {
                    console.error("Failed to fetch blogs by location", data.message);
                  }
                } catch (error) {
                  console.error("Error fetching blogs by location:", error);
                }
              } else {
                setSelectedCategoryBlogs(undefined); // Reset if unchecked
              }
            };

  return (
    <div className=" flex flex-col ">
      <DropdownMenu>
        <DropdownMenuTrigger className="hidden lg:flex fixed bottom-10 right-10 z-50 ">
          <Avatar className="w-16 h-16 border-gray-800 border-2">
            <AvatarImage src={user.user.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {/* <IoMdArrowDropdownCircle className="h-7 w-7 -ml-8" /> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-[60vw] min-h-[26vh] md:w-[20vw] absolute bottom-0 right-10">
          <DropdownMenuLabel className="bg-gray-800 rounded-md">
            <p className="text-blue-300 ">{user.user.name}</p>
            <p className="text-sm text-white font-normal">{user.user.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            asChild
            className="text-md font-semibold mb-1 text-gray-500 hover:bg-gray-400"
          >
            <Link to="/account">
              <FaUserSecret />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="text-md font-semibold mb-1 text-gray-500 hover:bg-gray-400"
          >
            <Link to="/your-blogs">
              <GrNotes />
              Your Blog
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-gray-200" />

          <DropdownMenuItem
            onClick={handleLogout}
            className="text-md font-semibold mb-1 text-gray-500 hover:bg-gray-200"
          >
            <IoLogOut />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* hero section */}
      <div className="w-full h-[25%] md:h-[33vh] lg:h-[50vh] overflow-hidden bg-gradient-to-b from-[#3f4247b4] to-[#1a1c208b] bg-opacity-10">
        <img
          src={HeroData?.heroSections.featuredImage}
          className="w-full h-[40%] lg:h-[63%] absolute top-16 -z-10 bg-cover "
        />
        {/* breadcrumb */}
        <div className="lg:h-96 h-36 md:h-80 flex flex-col justify-center mt-10 md:mt-6 ">
          {/* introduction */}
          <div className="lg:px-32 md:px-16 flex flex-col  items-center md:gap-10 ">
            
            <div className=" w-full md:px-0 px-8 md:w-[60vw]">
              <h1 className="text-white text-xl md:text-4xl lg:text-5xl font-bold text-center">
                {HeroData?.heroSections.title}
              </h1>
            </div>
            <div className=" mt-4 md:mt-0 flex flex-col md:flex-row gap-4">
                      <Link to="/write-blog"><InteractiveHoverButton className="px-10 py-3">Write a blog?</InteractiveHoverButton></Link>
            
                      
                    
                    
                    
                    </div>
          </div>
        </div>
      </div>

      {/* end hero section */}

      {newsData && newsData?.blog?.length > 0 && <div className="lg:px-32 mt-6 mb-6">
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
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

      <div className=" bg-[url(/346596-PAQ0SL-281.jpg)] bg-cover bg-no-repeat pb-20 ">
        <div className="lg:px-32  pb-10 px-1 md:px-0">
          <div className=" md:flex bg-gray-400 rounded-3xl xl:rounded-full p-4 shadow-xl items-center justify-center gap-8 mt-10">
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
            <span className="hidden md:block text-xl font-medium">|</span>
            <div className="flex-1 flex items-center justify-between flex-wrap">
              {category.map((category) => (
                  <DropdownMenu key={category._id}>
                    <DropdownMenuTrigger className="bg-gray-700 hover:bg-white hover:text-black text-white rounded-full px-4 py-2 mb-3 lg:mb-0">
                      {category.name}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {category.subCategories.length > 0 && category.subCategories.map((sub) => (
                          <DropdownMenuItem
                            key={sub._id}
                            onClick={() => fetchBlogsByCategory(sub._id)}
                            className="text-gray-700 hover:bg-gray-200"
                          >
                            {sub.name}
                          </DropdownMenuItem>
                        ))
                      }
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              ) }
            </div>
            
            
          </div>
          
        </div>

        <div className="lg:px-36 px-4 md:backdrop-blur-md -mt-3">
        <div className="mb-12">
              <h2 className="text-lg font-semibold mb-2">Filter by Location</h2>
              <div className="flex flex-wrap gap-4">
                {locationData?.locations.length>0 && locationData?.locations.map((location) => (
                  <label key={location} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={location}
                      onChange={handleLocationChange}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="text-black">{location}</span>
                  </label>
                ))}
              </div>
            </div>
        </div>

        

        <div className="mt-2 md:backdrop-blur-sm ">
          <FeaturedPosts
            lineBar={false}
            selectedCategoryBlogs={selectedCategoryBlogs}
            searchData={searchData}
          />

          
        </div>

        <div className="lg:px-32 mt-6 mb-6">
        <AddsSlot/>
        </div>

        

        <div className="backdrop-blur-sm ">
          <div className=" mb-16 flex flex-col items-center justify-center gap-6 md:px-0 px-3">
            <h1 className="text-2xl font-bold text-blue-800">Trending Blogs</h1>
            <p className="text-gray-600 text-center">
              Discover trending content from our community of traveller's
            </p>
          </div>

          {/* first */}

          <div className="md:px-5 lg:px-32 md:flex-1 md:flex-row flex-col flex items-center justify-between flex-wrap ">
            {blogData && blogData?.blogs.length > 0 ? (
              blogData?.blogs.map((blog) => (
                <div className="flex flex-col items-center justify-center gap-2 w-full md:px-0 px-4 md:w-[30vw] lg:w-[26vw] mb-10">
                  <Link to={`/blog/${blog.slug}/${blog.slug}`}>
                    {" "}
                    <img
                      src={blog.featuredimage}
                      alt=""
                      srcset=""
                      className="md:w-[30vw] w-full h-[30vh] rounded-lg"
                    />
                  </Link>

                  <h1 className="font-bold text-black text-base hover:text-gray-600 mt-1 text-center">
                    {blog.title}
                  </h1>

                  <div className="w-[10vw] h-1 bg-blue-600 rounded-full mb-2"></div>

                  <p className="text-gray-700 text-sm text-center w-[26vw]">
                    {plainText(blog.blogcontent).substring(0, 100).trim() +
                      (plainText.length > 100 ? "..." : "")}
                  </p>

                  <div className="mt-4">
                    <Link to={`/blog/${blog.slug}/${blog.slug}`}>
                      <p className="text-white text-sm font-bold bg-blue-600 px-4 py-2 rounded-md">
                        {" "}
                        Read More...{" "}
                      </p>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>

          

          <BlogHome />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MainPage;
