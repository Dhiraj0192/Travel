import React, { useEffect, useState } from "react";
import { FiSearch, FiPlus, FiFilter, FiChevronDown } from "react-icons/fi";
import Sidebar from "../../components/adminComponents/Sidebar";
import AllPost from "../../components/adminComponents/AllPost";
import { showToast } from "../..//helpers/showToast";
import { Card } from "../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { getEnv } from "../../helpers/getEnv";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import slugify from "slugify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useFetch } from "../../hooks/userFetch";
import Dropzone from "react-dropzone";
import Editor from "../../components/Editor";
import { Link } from "react-router-dom";

function Posts() {
  const [selectedCategoryBlogs, setSelectedCategoryBlogs] = useState();
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [query, setQuery] = useState();
    let [searchData , setSearchData] = useState();

  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`, {
    method: "get",
    credentials: "include",
  });

  const categories = categoryData?.category;

  const fetchBlogsByCategory = async (event) => {
    try {
      let categoryId = event.target.value;
      console.log(categoryId);

      if (categoryId === "All Categories") {
        
        const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-all`, {
          method: "get",
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setSelectedCategoryBlogs(data.blogs);
        } else {
          console.error(data.message);
        }
      } else {
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
      }
    } catch (error) {
      console.error("Error fetching blogs by category:", error);
    }
  };

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
    <div className="w-full flex">
      <div className="w-[20%] h-screen fixed">
        <Sidebar />
      </div>

      <div className="w-[80%] absolute left-[20%] bg-gray-900 px-6 py-6 min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white">Manage Blogs</h1>
            <p className="text-gray-300 mt-3">
              Create, edit, and manage your blog posts
            </p>
          </div>

          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <FiPlus />
            <Link to="/admin-add-blog">New Post</Link>
          </button>
        </div>

        <div className="p-6 bg-gray-600 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 ">
            {/* Search Input */}
            <div className="relative flex-1 bg-gray-500">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-green-400" />
              </div>
              <form onSubmit={handleSubmit}>
              <input
              name="q"
              onInput={getInput}
                type="text"
                placeholder="Search posts..."
                className=" pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              </form>
            </div>

            {/* Filter Button
      <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 bg-green-400">
        <FiFilter /> Filter
      </button> */}

            {/* Category Dropdown */}
            <div className="relative">
              <select
                onChange={fetchBlogsByCategory}
                className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 "
              >
                <option>All Categories</option>
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <option
                      onChange={category._id}
                      key={category._id}
                      value={category._id}
                    >
                      {category.name}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FiChevronDown className="text-gray-400" />
              </div>
            </div>
          </div>

          <AllPost selectedCategoryBlogs={selectedCategoryBlogs} searchData={searchData}/>
        </div>
      </div>
    </div>
  );
}

export default Posts;
