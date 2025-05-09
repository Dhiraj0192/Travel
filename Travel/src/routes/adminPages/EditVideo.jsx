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
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { decode } from "entities";
import { toast } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";

function EditVideo() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
    // console.log(user);
    
  
    // Protect the /single page route
    if (!user.isAdminLoggedIn) {
      return <Navigate to="/admin-login" replace />;
    }
  const videoid = useParams();
  // const { user } = useUser();

  // const user = useSelector((state)=> state.user)
 

  const [filePreview, setFilePreview] = useState();
  const [uploading, setUploading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [file, setFile] = useState();

  const { data: videoData, loading: videoLoading } = useFetch(
      `${getEnv("VITE_API_BASE_URL")}/video/edit/${videoid?.video_id}`,
      {
        method: "get",
        credentials: "include",
      },
      [videoid?.video_id]
    );
 

  const formSchema = z.object({
    
    title: z.string().min(3, "Title must be at least 3 character long."),
    link: z.string().min(3, "Link must be at least 3 character long."),
    
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      
      title: "",
      link: "",
      
    },
  });

  useEffect(() => {
      if (videoData) {
        setFilePreview(videoData.video.video);
        
        form.setValue("title", videoData.video.title);
        form.setValue("link", videoData.video.videolink);
        
      }
    }, [videoData]);
  
    const handleFileSlection = (files) => {
        const file = files[0];
        const preview = URL.createObjectURL(file);
        setFile(file);
        setFilePreview(preview);
      };
  

  async function onSubmit(values) {
    try {
      setUploading(true);
      const newValues = {
        ...values,
        author: user?.adminuser?.fullName,
        authorimage:
          user?.imageUrl || "https://www.flaticon.com/free-icon/user_9187604",
      };
      

      
      const formData = new FormData();
      if (file) {
        formData.append("file", file); 
      }
      formData.append("data", JSON.stringify(newValues));
      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/video/update/${videoid.video_id}`, {
        method: "put",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        setUploading(false);
        return showToast("error", data.message);
      }

      form.reset();

      setFile();
      setFilePreview();
      
      setUploading(false);
      navigate("/admin-videos");
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

  

  return (
    <div className="w-full flex ">
      {/* Sidebar */}
      <div
        className={`fixed z-50 bg-gray-800 h-screen transition-transform ${
          sidebarOpen ? "translate-x-0 w-[65%]" : "-translate-x-full"
        } lg:translate-x-0 lg:w-[20%]`}
      >
        <Sidebar />
      </div>

      <div className="w-full lg:w-[80%] absolute lg:left-[20%] bg-[url(/346596-PAQ0SL-281.jpg)] bg-cover bg-no-repeat px-6 py-6 min-h-screen">
        {/* Toggle Button for Mobile */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-black text-3xl focus:outline-none"
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-black">
              Let's Edit ...
            </h1>
            <p className="text-gray-800 mt-3">Edit your video blog posts</p>
          </div>
        </div>

        {/* add categories */}

        <div className="">
          <Card className="w-full bg-gray-800 p-5 mb-10">
            <h1 className="text-white text-2xl font-bold mb-5">Edit Blog</h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex md:flex-row flex-col md:items-center justify-between w-full">
                  <div className="flex flex-col items-start">
                    <div className="mb-3">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white text-lg">
                              Title
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="bg-gray-200 w-[80vw] md:w-[73vw]"
                                placeholder="Enter blog title.."
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mb-3 ">
                    <span className="text-white pb-4 text-lg">
                      Video <span className="text-green-500 pb-4 text-lg">Optional</span>
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
                            {filePreview === undefined && (
                              <div className="flex items-center gap-2">
                                <p className="text-white">Upload</p>
                                <FaCloudUploadAlt className="text-white"/>
                              </div>
                            )}
                            <img src={filePreview} alt="" srcset="" />
                          </div>
                        </div>
                      )}
                    </Dropzone>
                  </div>

                  <div className="mb-3">
                      <FormField
                        control={form.control}
                        name="link"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white text-lg">
                              YouTube Video Link
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="bg-gray-200 w-[80vw] md:w-[73vw]"
                                placeholder="Enter youtube video link.."
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    
                  </div>
                  
                </div>



                <div className="mt-5">
                  <Button type="submit" className="w-full bg-blue-500">
                    {uploading ? "Please Wait...." : "Update Video Blog"}
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

export default EditVideo;
