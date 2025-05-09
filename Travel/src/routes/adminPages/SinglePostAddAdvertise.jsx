import React, { useEffect, useState } from "react";
import { FiSearch, FiPlus, FiFilter, FiChevronDown } from "react-icons/fi";
import Sidebar from "../../components/adminComponents/Sidebar";
import AllPost from "../../components/adminComponents/AllPost";
import { showToast } from "../../helpers/showToast";
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
import { useSelector } from "react-redux";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Checkbox } from "../../components/ui/checkbox";
import { CKFinder } from "ckeditor5";
import { Navigate, useNavigate } from "react-router-dom";
import { decode } from "entities";
import { toast } from "react-toastify";

function SinglePostAddAdvertise() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user);
    console.log(user);
    
  
    // Protect the /single page route
    if (!user.isAdminLoggedIn) {
      return <Navigate to="/admin-login" replace />;
    }
  

  // const user = useSelector((state)=> state.user)


  const [filePreview, setFilePreview] = useState();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  

  const form = useForm();


  async function onSubmit(values) {
    try {
      setUploading(true);
      
      

      if (!file) {
        setUploading(false);
        toast("Advertise image required.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                
                });
       
      }
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/advertise/singlepost/add-advertise`, {
        method: "post",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        setUploading(false);
        return toast(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          
          }); 
      }
      
      form.reset();
      
      setFile();
      setFilePreview();
      
      setUploading(false);
      toast(data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        
        });
      
      

      
    } catch (error) {
      setUploading(false);
      
      
      toast(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        
        });
    }
  }

  const handleFileSlection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };

  return (
    <div className="">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 lg:pl-[16vw]">
          <div>
            <h1 className="text-2xl font-semibold text-black">
              Post Page Advertise
            </h1>
            
          </div>
        </div>

        {/* add categories */}

        <div className="lg:w-[50vw] lg:ml-[16vw]">
          <Card className="w-full bg-gray-800 p-5 mb-10">
            <h1 className="text-white text-2xl font-bold mb-5">Add Advertise</h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-center justify-between w-full">
                  
                  <div className="mb-3 ">
                  <span className="text-white pb-4 text-lg">
                    Advertise Image or GIF
                  </span>
                  <span className="text-red-600 pb-4 text-sm ml-2">
                    (only banner adds is allowed)
                  </span>
                  <Dropzone
                    onDrop={(acceptedFiles) =>
                      handleFileSlection(acceptedFiles)
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />

                        <div className="flex justify-center items-center w-[47vw] h-44 border-2 border-dashed rounded cursor-pointer">
                          <img src={filePreview} alt="" srcset="" />
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </div>
                  
                  
                </div>

                

                

                
                <div className="mt-5">
                  <Button  type="submit" className="w-full bg-blue-500">
                    {uploading ? "Please Wait...." : "Add Advertise"}
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>
    </div>
  );
}

export default SinglePostAddAdvertise;
