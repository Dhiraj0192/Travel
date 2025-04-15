import { Link, Navigate } from "react-router-dom";
import Image from "../components/Image";
import React, { useState } from "react";
import { useFetch } from "../hooks/userFetch";
import { getEnv } from "../helpers/getEnv";
import Footer from "../components/Footer";
import moment from "moment";
import { useSelector } from "react-redux";
import truncate from "html-truncate";
import { decode } from "html-entities";
import { convert } from "html-to-text";
import AddsSlot from "../components/AddsSlot";

function BlogPage() {
  const user = useSelector((state) => state.user);

  // Protect the /single page route
  if (!user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  let [selectedCategoryBlogs, setSelectedCategoryBlogs] = useState();
  const [sort, setSort] = useState("-createdAt");
  const [limit, setLimit] = useState(100000);
  const [query, setQuery] = useState();
  let [searchData , setSearchData] = useState();

  const categoryId = "67f36b931b58ce135a81e9d5";

  let { data: categoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: "get",
      credentials: "include",
    }
  );

  let {
    data: blogData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-all`, {
    method: "get",
    credentials: "include",
  });

  const categories = categoryData?.category;

  let { data } = useFetch(
    `${getEnv(
      "VITE_API_BASE_URL"
    )}/blog/blog/category/${categoryId}?limit=${limit}&sort=${sort}`,
    {
      method: "get",
      credentials: "include",
    }
  );

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
        console.log(data.blogs);

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

  if (searchData != undefined) {
    
    blogData = [];
    selectedCategoryBlogs = [];
  }

  if (selectedCategoryBlogs != undefined) {
    
    blogData = [];
    
    
  }
  return (
    <div className=" flex flex-col ">
      <div className="w-full h-[45vh] overflow-hidden bg-gradient-to-b from-[#879cbf8b] to-[#1a1c208b] bg-opacity-5">
        <img
          src="/adventure.jpg"
          className="w-full h-[56vh] absolute top-0 -z-10 bg-cover "
        />
        {/* breadcrumb */}
        <div className=" flex flex-col justify-center  mt-20 gap-4">
          <div className="flex gap-4 lg:px-32 text-white ">
            <Link to="/home" className="text-xl text-blue-200">
              Blogs and Articles
            </Link>
            <span className="text-xl text-white">.</span>
          </div>
          {/* introduction */}
          <div className="lg:px-32 flex items-center gap-8">
          <Link to="/write-blog" className="">
              <svg
                viewBox="0 0 200 200"
                width="170"
                height="200"
                className="text-xl font-bold tracking-widest animate-spin animatedButton -ml-2 text"
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

              <button className="absolute top-64 left-40 w-24 h-24 bg-blue-800 rounded-full flex items-center justify-center">
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

      <div className="flex flex-col md:flex-row gap-8 w-full">
        <div className="lg:pl-32 lg:w-[20vw] h-max sticky top-10">
          <h1 className="mt-20 mb-12 text-xl font-medium">Categories </h1>
          <div className="flex flex-col gap-3 text-sm">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => fetchBlogsByCategory(category._id)}
                  className="underline text-start"
                >
                  {category.name}
                </button>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col">
          <div className="lg:pr-32 pt-5 pb-10 w-full">
            <div className="hidden md:flex bg-gray-700 rounded-xl xl:rounded-full p-1 shadow-xl items-center justify-center gap-8 mt-10 w-full mb-5">
              <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2 w-full">
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
                    className="bg-transparent w-[60vw] border-0 outline-none"
                  />
                </form>
              </div>
            </div>
          </div>

          <div className="lg:pr-32 flex-1 flex  flex-wrap gap-4 mb-20">
            

                {searchData ? searchData.map(blog =><div
                    key={blog._id}
                    className=" rounded-xl w-[32%]  flex flex-col "
                  >
                    <img
                      src={blog.featuredimage}
                      className="rounded-xl object-cover w-full h-[35vh]"
                    />
                    <div className="p-4 flex flex-col justify-center items-center gap-3">
                      <span className=" inline-block px-3 py-1 text-xs font-semibold text-white bg-gray-700 rounded-full">
                        {blog.category.name}
                      </span>
                      <p className="text-black font-semibold text-lg text-center">
                        {blog.title}
                      </p>

                      {/* <div className="flex items-center justify-start gap-4">
                        <img
                          src={blog.authorimage}
                          className="rounded-full object-cover w-10 h-10"
                        />
                        <div className="flex flex-col ">
                          <p className="text-sm text-gray-600">{blog.author}</p>
                          <p className="text-gray-600">
                            Posted on{" "}
                            {moment(blog?.createdAt).format("DD-MM-YYYY")}
                          </p>
                        </div>
                      </div> */}
                      <div className="w-[10vw] h-[1px] bg-blue-600 rounded-full"></div>

                      <p className="text-gray-600 text-center text-sm">
                        {plainText(blog.blogcontent).substring(0, 100).trim() +
                          (plainText.length > 100 ? "..." : "")}
                      </p>

                      <div className="mt-3">
                        <Link to={`/blog/${blog.category.slug}/${blog.slug}`}>
                          <p className="text-white text-sm font-bold bg-blue-700 px-4 py-2 rounded-md">
                            {" "}
                            Read More...{" "}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>) :  blogData && Array.isArray(blogData?.blog)
              ? blogData?.blog.map((blog, index) => (
                  <div
                    key={blog._id}
                    className=" rounded-xl w-[32%]  flex flex-col "
                  >
                    <img
                      src={blog.featuredimage}
                      className="rounded-xl object-cover w-full h-[35vh]"
                    />
                    <div className="p-4 flex flex-col justify-center items-center gap-3">
                      <span className=" inline-block px-3 py-1 text-xs font-semibold text-white bg-gray-700 rounded-full">
                        {blog.category.name}
                      </span>
                      <p className="text-black font-semibold text-lg text-center">
                        {blog.title}
                      </p>

                      {/* <div className="flex items-center justify-start gap-4">
                        <img
                          src={blog.authorimage}
                          className="rounded-full object-cover w-10 h-10"
                        />
                        <div className="flex flex-col ">
                          <p className="text-sm text-gray-600">{blog.author}</p>
                          <p className="text-gray-600">
                            Posted on{" "}
                            {moment(blog?.createdAt).format("DD-MM-YYYY")}
                          </p>
                        </div>
                      </div> */}
                      <div className="w-[10vw] h-[1px] bg-blue-600 rounded-full"></div>

                      <p className="text-gray-600 text-center text-sm">
                        {plainText(blog.blogcontent).substring(0, 100).trim() +
                          (plainText.length > 100 ? "..." : "")}
                      </p>

                      <div className="mt-3">
                        <Link to={`/blog/${blog.category.slug}/${blog.slug}`}>
                          <p className="text-white text-sm font-bold bg-blue-700 px-4 py-2 rounded-md">
                            {" "}
                            Read More...{" "}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              : selectedCategoryBlogs &&
                selectedCategoryBlogs.map((blog, index) => (
                  <div
                    key={blog._id}
                    className=" rounded-xl w-[32%] flex flex-col "
                  >
                    <img
                      src={blog.featuredimage}
                      className="rounded-xl object-cover w-full h-[35vh]"
                    />
                    <div className="p-4 flex flex-col justify-center items-center gap-3">
                      <span className=" inline-block px-3 py-1 text-xs font-semibold text-white bg-gray-700 rounded-full">
                        {blog.category.name}
                      </span>
                      <p className="text-black font-semibold text-lg text-center">
                        {blog.title}
                      </p>

                      {/* <div className="flex items-center justify-start gap-4">
                        <img
                          src={blog.authorimage}
                          className="rounded-full object-cover w-10 h-10"
                        />
                        <div className="flex flex-col ">
                          <p className="text-sm text-gray-600">{blog.author}</p>
                          <p className="text-gray-600">
                            Posted on{" "}
                            {moment(blog?.createdAt).format("DD-MM-YYYY")}
                          </p>
                        </div>
                      </div> */}
                      <div className="w-[10vw] h-[1px] bg-blue-600 rounded-full"></div>

                      <p className="text-gray-600 text-center text-sm">
                        {plainText(blog.blogcontent).substring(0, 100).trim() +
                          (plainText.length > 100 ? "..." : "")}
                      </p>

                      <div className="mt-3">
                        <Link to={`/blog/${blog.category.slug}/${blog.slug}`}>
                          <p className="text-white text-sm font-bold bg-blue-700 px-4 py-2 rounded-md">
                            {" "}
                            Read More...{" "}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        
      </div>
      <div className="mt-10 mb-10">
      <AddsSlot/>
      </div>

      <Footer />
    </div>
  );
}

export default BlogPage;
