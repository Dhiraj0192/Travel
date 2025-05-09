import { Link, Navigate, useNavigate } from "react-router-dom";
import Image from "../components/Image";
import React, { useEffect, useState } from "react";
import { useFetch } from "../hooks/userFetch";
import { getEnv } from "../helpers/getEnv";
import Footer from "../components/Footer";
import moment from "moment";
import { useSelector } from "react-redux";
import truncate from "html-truncate";
import { decode } from "html-entities";
import { convert } from "html-to-text";
import AddsSlot from "../components/AddsSlot";
import UserIcon from "../components/UserIcon";
import { Button } from "../components/ui/button";
import { set } from "zod";
import { InteractiveHoverButton } from "../components/magicui/interactive-hover-button";

function BlogPage() {
  const user = useSelector((state) => state.user);

  

  let [selectedCategoryBlogs, setSelectedCategoryBlogs] = useState();
  const [sort, setSort] = useState("-createdAt");
  const [limit, setLimit] = useState(100000);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState();
  let [searchData , setSearchData] = useState();
  let [bData , setBData] = useState();
  let [categoryIdAll, setCategoryIdAll] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState([]);

  const categoryId = "67f36b931b58ce135a81e9d5";
  const navigate = useNavigate();

  const handleRefresh = () => {
    setCategoryIdAll("All Categories")
  };


  let { data: categoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: "get",
      credentials: "include",
    }
  );

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

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/blog/get-all2?page=${page}&limit=9`,
          {
            method: "get",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (isMounted && response.ok) {
          setBData(data);
          setTotalPages(data.totalPages || 1);
        }
      } catch (error) {
        if (isMounted) {
          console.error(error.message);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to prevent state updates on unmounted components
    };
  }, [page]);

  const categories = categoryData?.category;

  

  const fetchBlogsByCategory = async (categoryId, page = 1) => {
    try {
      
      setCategoryIdAll(categoryId);
      if (categoryId === "All Categories") {
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/blog/get-all2?page=${page}&limit=9`,
          {
            method: "get",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (response.ok) {
          setSelectedCategoryBlogs(data?.blog);
          setTotalPages(data?.totalPages);
        } else {
          console.error(data.message);
        }
      } else {
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/category/blogs2/${categoryId}?page=${page}&limit=9`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (response.ok) {
          setSelectedCategoryBlogs(data.blogs);
          
          setTotalPages(data?.totalPages);
          
          
          setSearchData(undefined);
        } else {
          console.error(data.message);
        }
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

  const handleSubmit = async (e, page = 1) => {
    e.preventDefault();
    const response = await fetch(
      `${getEnv("VITE_API_BASE_URL")}/blog/search2/${query}?page=${page}&limit=9`,
      {
        method: "get",
        credentials: "include",
      }
    );
    const data = await response.json();
    if (response.ok && data?.blog.length > 0) {
      setSearchData(data.blog);
      setTotalPages(data.totalPages || 1);
    } else {
      console.error(data.message);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    if (searchData) {
      handleSubmit({ preventDefault: () => {} }, currentPage);
    } else if (categoryIdAll) {
      fetchBlogsByCategory(categoryIdAll, currentPage);
    } else {
      setPage(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    if (searchData) {
      setBData(""); // Clear other data when searchData is present
      setSelectedCategoryBlogs([]);
    }
  }, [searchData]);

  useEffect(() => {
    if (selectedCategoryBlogs) {
      setBData(""); // Clear other data when selectedCategoryBlogs is present
    }
  }, [selectedCategoryBlogs]);

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-1 rounded-md ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black hover:bg-gray-500 hover:text-white"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className=" flex flex-col ">
      {user?.isLoggedIn && <UserIcon/>}
      <div className="w-full h-[50%] md:h-[35%] lg:h-[45vh] overflow-hidden bg-gradient-to-b from-[#879cbf8b] to-[#1a1c208b] bg-opacity-5">
        <img
          src="/adventure.jpg"
          className="w-full h-[50%] md:h-[35%] lg:h-[57%] absolute top-16 -z-10 bg-cover "
        />
        {/* breadcrumb */}
        <div className=" flex flex-col justify-center mt-10  md:mt-20 gap-4">
          
          {/* introduction */}
          <div className=" lg:px-32 flex-col flex items-center gap-3">
         
            <div className=" w-[80vw] text-center md:w-[60vw]">
              <h1 className="text-white text-2xl md:text-3xl lg:text-5xl font-bold">
                Share your content, engage with readers, and grow audience.
              </h1>
              <p className="mt-8 text-md md:text-xl text-white">
                Our intuitive editor makes it easy to express yourself with
                text, images, and multimedia.
              </p>

              
            </div>
            <div className=" mt-4 md:mt-0 flex flex-col md:flex-row gap-4">
                                    <Link to="/write-blog"><InteractiveHoverButton className="px-10 py-2">Write a blog?</InteractiveHoverButton></Link>
                          
                                    
                                  
                                  
                                  
                                  </div>
            
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full px-6 md:px-6  md:mt-14">
        <div className="lg:pl-28 lg:w-[45vw] md:h-max md:sticky md:top-10">
          <h1 className="mt-20 mb-12 text-xl font-medium">Categories </h1>
          <div className="category-tree">
            {category.map((category) => (
                <div key={category._id} className="category-node">
                    <div className="category-name text-md">
                        📁 {category.name}
                    </div>
                    {category.subCategories.length > 0 && (
                        <div className="subcategories-list">
                            {category.subCategories.map((sub) => (
                              <button
                              key={sub._id}
                              onClick={() => fetchBlogsByCategory(sub._id)}
                             className="subcategory-node text-sm"
                            >
                              {sub.name}
                            </button>
                                
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
          
        </div>

        <div className="w-full flex flex-col">
          <div className="lg:pr-32 pt-5 pb-10 w-full">
            <div className="hidden md:flex bg-gray-400 rounded-xl xl:rounded-full p-1 shadow-xl items-center justify-center gap-8 mt-10 w-full mb-5">
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
                <form onSubmit={handleSubmit} className="flex items-center">
                  <input
                    name="q"
                    onInput={getInput}
                    type="text"
                    placeholder="search a post..."
                    className="bg-transparent w-[60vw] md:w-[50vw] lg:w-[50vw] border-0 outline-none"
                  />
                  <Button onClick={handleSubmit} className="rounded-full px-8">Search</Button>
                </form>
              </div>
            </div>
          </div>

          <div className="lg:pr-32 flex-1 flex  flex-wrap gap-4 mb-20">
            

                {searchData ? searchData.map(blog =><div
                    key={blog._id}
                    className=" rounded-xl w-full md:w-[35vw] lg:w-[32%]  flex flex-col "
                  >
                    <Link to={`/blog/${blog.subcategory.slug}/${blog.slug}`}>
                          
                          <img
                            src={blog.featuredimage}
                            className="rounded-xl object-cover w-full h-[35vh]"
                          />
                          </Link>
                    <div className="p-4 flex flex-col justify-center items-center gap-3">
                      <span className=" inline-block px-3 py-1 text-xs font-semibold text-white bg-gray-700 rounded-full">
                        {blog.subcategory.name}
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
                        <Link to={`/blog/${blog.subcategory.slug}/${blog.slug}`}>
                          <p className="text-white text-sm font-bold bg-blue-700 px-4 py-2 rounded-md">
                            {" "}
                            Read More...{" "}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>) :  bData && Array.isArray(bData?.blog) 
              ? bData?.blog.map((blog, index) => (
                  <div
                    key={blog._id}
                    className=" rounded-xl w-full md:w-[35vw] lg:w-[32%]  flex flex-col "
                  >
                    <Link to={`/blog/${blog.subcategory.slug}/${blog.slug}`}>
                          
                          <img
                            src={blog.featuredimage}
                            className="rounded-xl object-cover w-full lg:h-[35vh] h-[20vh]"
                          />
                          </Link>
                    <div className="p-4 flex flex-col justify-center items-center gap-3">
                      <span className=" inline-block px-3 py-1 text-xs font-semibold text-white bg-gray-700 rounded-full">
                        {blog.subcategory.name}
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
                        <Link to={`/blog/${blog.subcategory.slug}/${blog.slug}`}>
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
                    className=" rounded-xl w-full md:w-[35vw] lg:w-[32%]  flex flex-col "
                  >
                    <Link to={`/blog/${blog.subcategory.slug}/${blog.slug}`}>
                          
                    <img
                      src={blog.featuredimage}
                      className="rounded-xl object-cover w-full h-[35vh]"
                    />
                    </Link>
                    <div className="p-4 flex flex-col justify-center items-center gap-3">
                      <span className=" inline-block px-3 py-1 text-xs font-semibold text-white bg-gray-700 rounded-full">
                        {blog.subcategory.name}
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
                        <Link to={`/blog/${blog.subcategory.slug}/${blog.slug}`}>
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
          <div className="w-full md:w-[70vw] h-[1px] bg-gray-500"></div>
          <div className="w-full md:w-[70vw] pagination-controls flex justify-center items-center gap-4 mt-6 mb-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md bg-gray-300 text-gray-900 hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            {renderPagination()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
        
      </div>

      
      

      <Footer />
    </div>
  );
}

export default BlogPage;
