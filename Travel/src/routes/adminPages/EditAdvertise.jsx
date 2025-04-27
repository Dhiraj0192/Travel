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
import { useSelector } from "react-redux";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate, useParams } from "react-router-dom";

import { decode } from "entities";
import Loading from "../../components/Loading";
import { Checkbox } from "../../components/ui/checkbox";
import { toast } from "react-toastify";

function EditAdvertise() {
  const navigate = useNavigate()
    const { isSignedIn } = useAuth();
    if (isSignedIn === false) {
  
      navigate('/admin-login');
      
    }
  
  const advertiseid = useParams();
  const [uploading, setUploading] = useState(false);
  
  

  const { user } = useUser();

  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  const { data: advertiseData, loading: advertiseLoading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/advertise/edit/${advertiseid?.advertise_id}`,
    {
      method: "get",
      credentials: "include",
    },
    [advertiseid?.advertise_id]
  );



  const form = useForm();
  
  useEffect(() => {
    if (advertiseData) {
      setFilePreview(advertiseData?.advertise.image);
     
      
    }
  }, [advertiseData]);

  

  const handleFileSlection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };

  async function onSubmit(values) {
    try {
      
      const formData = new FormData();
      if (file) {
        formData.append("file", file); // Add file only if it exists
      }
      
      console.log(advertiseid?.advertise_id);
      

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/advertise/update/${advertiseid.advertise_id}`,
        {
          method: "put",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) {
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

      navigate("/admin-dashboard");
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

  

  return (
    <div className="w-full flex bg-transparent">
      <div
        className={`fixed z-50 bg-gray-800 h-screen transition-transform ${
          sidebarOpen ? "translate-x-0 w-[65%]" : "-translate-x-full"
        } lg:translate-x-0 lg:w-[20%]`}
      >
        <Sidebar />
      </div>

      <div className="w-full lg:w-[80%] absolute lg:left-[20%] bg-[url(public/346596-PAQ0SL-281.jpg)] bg-cover bg-no-repeat px-6 py-6 min-h-screen">
        {/* Toggle Button for Mobile */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-black text-3xl focus:outline-none"
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 lg:pt-[13vh] lg:pl-[16vw]">
          <div>
            <h1 className="text-2xl font-semibold text-black">
              Let's Update Advertise
            </h1>
            
          </div>
        </div>

        {/* add categories */}

        <div className=" lg:w-[50vw] lg:ml-[16vw]">
          <Card className="w-full bg-gray-800 p-5 mb-10">
            <h1 className="text-white text-2xl font-bold mb-5">Update Advertise</h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-center justify-between w-full">
                  
                  <div className="mb-3 ">
                  <span className="text-white pb-4 text-lg">
                    Advertise Image
                  </span>
                  <Dropzone
                    onDrop={(acceptedFiles) =>
                      handleFileSlection(acceptedFiles)
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />

                        <div className="flex justify-center items-center w-44 h-44 border-2 border-dashed rounded cursor-pointer">
                          <img src={filePreview} alt="" srcset="" />
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </div>
                  
                  
                </div>

                

                

                
                <div className="mt-5">
                  <Button  type="submit" className="w-full bg-blue-500">
                    {uploading ? "Please Wait...." : "Update Advertise"}
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default EditAdvertise;
