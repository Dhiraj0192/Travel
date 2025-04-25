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

function EditPackage() {
  const navigate = useNavigate()
    const { isSignedIn } = useAuth();
    if (isSignedIn === false) {
  
      navigate('/admin-login');
      
    }
  
  const packageid = useParams();
  console.log(packageid);
  

  const { user } = useUser();

  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  const { data: packageData, loading: packageLoading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/package/edit/${packageid?.package_id}`,
    {
      method: "get",
      credentials: "include",
    },
    [packageid?.blog_id]
  );

  console.log(packageData);
  
  
  

  const formSchema = z.object({
    
    title: z.string().min(3, "Title must be at least 3 character long."),
    price: z.string(),
    packageurl: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      
      title: "",
      price: "",
      packageurl: "",
      
    },
  });
  console.log(packageData);
  

  useEffect(() => {
    if (packageData) {
      setFilePreview(packageData?.packag.packageImage);
      
      form.setValue("title", packageData.packag.title);
      form.setValue("price", packageData.packag.price);
      form.setValue("packageurl", packageData.packag.packageurl);
      
    }
  }, [packageData]);

  

  const handleFileSlection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };

  async function onSubmit(values) {
    try {
      // Validate all fields
      if (
        
        !values.title ||
        !values.price ||
        !values.packageurl
      ) {
        return toast("All fields are required.", {
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

      const newValues = {
        ...values,
        
      };
      const formData = new FormData();
      if (file) {
        formData.append("file", file); // Add file only if it exists
      }
      formData.append("data", JSON.stringify(newValues));

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/package/update/${packageid.package_id}`,
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

      navigate("/admin-packages");
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

  if (packageLoading) return <Loading />;

  return (
    <div className="w-full flex bg-transparent ">
      <div
        className={`fixed z-50 bg-gray-800 h-screen transition-transform ${
          sidebarOpen ? "translate-x-0 w-[65%]" : "-translate-x-full"
        } lg:translate-x-0 lg:w-[20%]`}
      >
        <Sidebar />
      </div>

      <div className="w-full lg:w-[80%] absolute lg:left-[20%] bg-gray-900 px-6 py-6 min-h-screen">
        {/* Toggle Button for Mobile */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white text-3xl focus:outline-none"
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6  lg:pt-[13vh] lg:pl-[16vw]">
         
          
          <div>
            <h1 className="text-2xl font-semibold text-white">
              Edit your Package...
            </h1>
            <p className="text-gray-300 mt-3">Manage your Package</p>
          </div>
          
        </div>

        <div className="lg:w-[50vw] lg:ml-[16vw]">
          <Card className="w-full bg-gray-600 p-5 mb-10">
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
                                className="bg-gray-200 w-[77vw] md:w-[63vw] lg:w-[34vw]"
                                placeholder="Enter package title.."
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-lg">
                          Price
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-300 w-[77vw] md:w-[63vw] lg:w-[34vw]"
                            placeholder="Enter your price"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                    
                  </div>
                  <div className="mb-3 ">
                    <span className="text-white pb-4 text-lg">
                      Package Image
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
                            {filePreview && (
                              <img src={filePreview} alt="Preview" />
                            )}
                          </div>
                        </div>
                      )}
                    </Dropzone>
                  </div>
                </div>

                

                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="packageurl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-lg">
                          Url
                        </FormLabel>
                        <FormControl>
                        <Input
                            className="bg-gray-300"
                            placeholder="Enter your package url"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mt-5 text-right">
                 <div className="mt-3 text-right">
          <Button type="submit" className="w-[35vw] md:w-[20vw] lg:w-[10vw] bg-blue-500 text-white">
                    Update Package
                  </Button>
            </div>
                  
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default EditPackage;
