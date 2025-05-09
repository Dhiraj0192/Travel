import { Link, Navigate } from "react-router-dom";
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
import { deleteData } from "../helpers/handleDelete";
import { FaBookOpenReader } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import UserIcon from "../components/UserIcon";



function UserBlogPage() {
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
  const [refreshData, setRefreshData] = useState(false);
  const [category, setCategory] = useState([]);

  const categoryId = "67f36b931b58ce135a81e9d5";

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

  let {
    data: blogData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/userblog/${user?.user.id}`, {
    method: "get",
    credentials: "include",
  },[refreshData]);


  

  const categories = categoryData?.category;


  const fetchBlogsByCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/blog/${categoryId}/${user?.user.id}`,
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
      `${getEnv("VITE_API_BASE_URL")}/blog/usersearch/${user?.user.id}/${query}`,
      {
        method: "get",
        credentials: "include",
      }
    );

    const usersearchdata = await response.json();
    
    
    if (usersearchdata?.blog.length > 0) {
      setSearchData(usersearchdata?.blog)
      
      
    }
    
  };

  if (searchData != undefined) {
    
    blogData = [];
    selectedCategoryBlogs = [];
  }

  if (selectedCategoryBlogs != undefined) {
    
    blogData = [];
    
    
  }

  const handleDelete = (id) => {
      const respnse = deleteData(
        `${getEnv("VITE_API_BASE_URL")}/blog/delete/${id}`
      );
      if (respnse) {
        setRefreshData(!refreshData);
        toast("Data deleted", {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: false,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                      
                      });
        
      } else {
        toast("Data not deleted", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          
          });
        
      }
    };
  return (
    <div className=" flex flex-col ">
      <UserIcon/>
      <div className="w-full h-[23vh] md:h-[30vh] lg:h-[30vh] overflow-hidden bg-gradient-to-b from-[#879cbf8b] to-[#1a1c208b] bg-opacity-5">
        <img
          src="/adventure.jpg"
          className="w-full h-[35vh] md:h-[38vh] lg:h-[51vh] absolute top-0 -z-10 bg-contain "
        />
        {/* breadcrumb */}
        <div className=" flex flex-col justify-center gap-4">
          
          {/* introduction */}
          <div className="md:px-6 lg:px-32 flex flex-col items-center justify-center mt-16 md:mt-16 lg:mt-16">
            <div className=" w-[60vw]">
              
              <p className=" text-md md:text-2xl text-white font-bold text-center">
                Our intuitive editor makes it easy to express yourself with
                text, images, and multimedia.
              </p>
            </div>
            
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full  md:mb-20 px-6 md:px-0 -mt-8 md:-mt-0">
      <div className="lg:pl-28 lg:w-[35vw] md:h-max md:sticky md:top-10">
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

        <div className="w-full flex flex-col ">
          {/* <div className="lg:pr-32 pt-5 pb-10 w-full">
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
          </div> */}

          <div className="lg:pr-32 pt-10 md:pt-20 pb-10 w-full">
            <h2 className="font-semibold text-lg">Your Blogs</h2>
            <div className="w-full h-[1px] bg-gray-600"></div>
          </div>

          <div className="lg:pr-32 flex-1 flex  flex-wrap gap-4 mt-4 ">
            

                {searchData ? searchData.map(blog =><div
                    key={blog._id}
                    className=" rounded-xl w-[100%] md:w-[40%] lg:w-[32%]  flex flex-col mb-5 md:mb-0"
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

                      <div className="mt-3 flex items-center justify-between gap-8">
                        <Link to={`/blog/${blog.subcategory.slug}/${blog.slug}`}>
                          <p className="text-gray-600 text-sm font-bold flex items-center gap-1">
                          <FaBookOpenReader className="w-6 h-6" />
                            {" "}
                            Read{" "}
                          </p>
                        </Link>
                        <Link to={`/edit-user-blog/${blog._id}`}>
                          <p className="text-green-500 text-sm font-bold flex items-center ">
                            <AiFillEdit className="w-6 h-6"/>
                            Edit{" "}
                          </p>
                        </Link>
                        <button onClick={() => handleDelete(blog._id)}>
                          <p className="text-red-500 text-sm font-bold flex items-center ">
                            <MdDelete className="w-6 h-6"/>
                            {" "}
                            Delete{" "}
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>) :  blogData && Array.isArray(blogData?.blogs)
              ? blogData?.blogs.map((blog, index) => (
                  <div
                    key={blog._id}
                    className=" rounded-xl w-[100%] md:w-[48%]  lg:w-[32%] flex flex-col mb-5 md:mb-0"
                  >
                    <img
                      src={blog.featuredimage}
                      className="rounded-xl object-cover w-full h-[35vh]"
                    />
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

                      <div className="mt-3 flex items-center justify-between gap-8">
                        <Link to={`/blog/${blog.subcategory.slug}/${blog.slug}`}>
                          <p className="text-gray-600 text-sm font-bold flex items-center gap-1">
                          <FaBookOpenReader className="w-6 h-6" />
                            {" "}
                            Read{" "}
                          </p>
                        </Link>
                        <Link to={`/edit-user-blog/${blog._id}`}>
                          <p className="text-green-500 text-sm font-bold flex items-center ">
                            <AiFillEdit className="w-6 h-6"/>
                            Edit{" "}
                          </p>
                        </Link>
                        <button onClick={() => handleDelete(blog._id)}>
                          <p className="text-red-500 text-sm font-bold flex items-center ">
                            <MdDelete className="w-6 h-6"/>
                            {" "}
                            Delete{" "}
                          </p>
                        </button>
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

                      <div className="mt-3 flex items-center justify-between gap-8">
                        <Link to={`/blog/${blog.subcategory.slug}/${blog.slug}`}>
                          <p className="text-gray-600 text-sm font-bold flex items-center gap-1">
                          <FaBookOpenReader className="w-6 h-6" />
                            {" "}
                            Read{" "}
                          </p>
                        </Link>
                        <Link to={`/edit-user-blog/${blog._id}`}>
                          <p className="text-green-500 text-sm font-bold flex items-center ">
                            <AiFillEdit className="w-6 h-6"/>
                            Edit{" "}
                          </p>
                        </Link>
                        <button onClick={() => handleDelete(blog._id)}>
                          <p className="text-red-500 text-sm font-bold flex items-center ">
                            <MdDelete className="w-6 h-6"/>
                            {" "}
                            Delete{" "}
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default UserBlogPage;
