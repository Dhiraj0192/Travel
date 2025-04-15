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
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment/moment";
import CommentCount from "../../components/CommentCount";
import { decode } from "entities";
import { deleteData } from "../../helpers/handleDelete";
import { useAuth } from "@clerk/clerk-react";


function AdminBlogShow() {
    const navigate = useNavigate()
  const { isSignedIn } = useAuth();
  if (isSignedIn === false) {

    navigate('/admin-login');
    
  }
    
    
    const blogid = useParams();
  
    console.log(blogid);
    
  
    const { post } = useParams();
  
    // Call useFetch at the top level
    const { data: singleblog, loading } = useFetch(
      `${getEnv("VITE_API_BASE_URL")}/blog/get-blog/${post}`,
      {
        method: "get",
        credentials: "include",
      }
    );
    console.log(singleblog);

    const handleDelete = (id) => {
        const respnse = deleteData(
          `${getEnv("VITE_API_BASE_URL")}/blog/delete/${id}`
        );
        if (respnse) {
          setRefreshData(!refreshData);
          navigate("/admin-posts");
          showToast("success", "Data deleted");
        } else {
          showToast("error", "Data not deleted.");
        }
      };

      const formSchema = z.object({
          
          status: z.string(),
        });
      
        const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
            
            status : "published",
          },
        });
      
        async function onSubmit(values) {
          try {
            
    
            const formData = new FormData();
      
            const response = await fetch(
              `${getEnv("VITE_API_BASE_URL")}/blog/approval/${singleblog?.blog._id}`,
              {
                method: "put",
                credentials: "include",
                body: formData,
              }
            );
      
            const data = await response.json();
            if (!response.ok) {
              return showToast("error", data.message);
            }
      
            
      
            navigate("/admin-posts");
            showToast("success", data.message);
          } catch (error) {
            showToast("error", error.message);
          }
        }
    

  return (
    <div className="w-full flex">
      <div className="w-[20%] h-screen fixed">
        <Sidebar />
      </div>

      <div className="w-[80%] absolute left-[20%]  px-6 py-6 min-h-screen">

      <div className="flex justify-center items-center gap-8">
          <div className=" lg:w-3/5 flex flex-col gap-8">
            <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
              {singleblog?.blog.title || "Untitled Blog"}
            </h1>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>Written by</span>
              <Link className="text-blue-800 font-semibold">
                {singleblog?.blog.author || "Unknown Author"}
              </Link>
              <span>on</span>
              <Link className="text-blue-800 font-semibold">
                {singleblog?.blog.category?.name || "Uncategorized"}
              </Link>
              <span>
                {moment(singleblog?.blog.createdAt).format("DD-MM-YYYY") || "N/A"} ago
              </span>
              
            </div>
            {singleblog?.blog.status === "pending" ? <div className="flex items-center gap-4">
                 <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)}>
                              <Button type="submit" className="bg-green-700 text-md">Approve</Button>
                                </form></Form>
              
              <Button onClick={() => handleDelete(singleblog?.blog._id)}  className="bg-red-700 text-md">Reject</Button>
            </div> : <div className="flex items-center justify-start gap-6">
                
                
              </div>}
          </div>
          <div className="hidden lg:block w-2/5">
            <img
              src={singleblog?.blog.featuredimage || "/placeholder-image.jpg"}
              alt="Featured"
              className="rounded-xl w-full h-80 bg-cover"
            />
          </div>
        </div>

        {/* content */}
        <div className="flex flex-col md:flex-row gap-8 w-full mt-10">
          {/* text */}
          <div className="lg:w-[82%] lg:text-lg flex flex-col gap-6 text-justify">
            <div className="text-justify"
              dangerouslySetInnerHTML={{
                __html: decode(singleblog?.blog.blogcontent || ""),
              }}
            ></div>

            

            
          </div>
          
        </div>
        
      </div>
    </div>
  );
}

export default AdminBlogShow;
