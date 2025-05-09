import Image from "../components/Image";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Button } from "../components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";

import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/user.slice.js";
import Dropzone from "react-dropzone";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { IoCameraOutline } from "react-icons/io5";
import { Textarea } from "../components/ui/textarea";
import { useFetch } from "../hooks/userFetch";
import { getEnv } from "../helpers/getEnv";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { showToast } from "../helpers/showToast";
import { toast } from "react-toastify";
import UserIcon from "../components/UserIcon";

function AccountPage() {
  const dispath = useDispatch();
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();
  const [uploading, setUploading] = useState(false);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const {
      data : userData,
      error,
      loading,
    } = useFetch(
      `${getEnv("VITE_API_BASE_URL")}/user/get-user/${user.user._id}`,
      { method: "get", credentials: "include" }
    );

   
    

  const formSchema = z.object({
    name: z.string().min(3,'Name must be at least 3 character long'),
    email: z.string().email(),
    bio: z.string().min(3,'Bio must be at least 3 character long.'),
    
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: "",
      bio: '',
      password: "",
    },
  });

  useEffect(()=>{
    if(userData && userData.success){
      form.reset({
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio
      })
    }
  },[userData])

  async function onSubmit(values) {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(values));
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/update-user/${user.user._id}`,
        {
          method: "put",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        setUploading(false);
        return toast(data.message, {
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
      setUploading(false);
      dispath(setUser(data.user));
      toast(data.message, {
                            position: "bottom-right",
                            autoClose: 5000,
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
  }

  const handleFileSlection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };
  // if (loading) return <Loading />;
  return (
    <div className="mt-0 flex flex-col items-center rounded-3xl justify-center ">
      {user?.isLoggedIn && <UserIcon/>}
      {/* blob elements */}
      <div className="absolute top-29 left-10 z-20"></div>
      <div className="absolute top-20 right-0 -z-10"></div>
      <div className="absolute bottom-10 left-20 -z-10"></div>
      {/* breadcrumb */}
      <div className=" w-full h-[28vh] md:h-[20vh] lg:h-[20vh] overflow-hidden bg-gradient-to-b from-[#879cbf8b] to-[#1a1c208b] bg-opacity-5">
        <Image
          src="pexels-fmaderebner-238622.jpg"
          className="opacity-100 w-full absolute top-0 -z-10 h-[37vh] md:h-[27vh] lg:h-[40vh] overflow-hidden"
        />
      </div>
      <div className="flex gap-4 z-20 absolute top-28 md:top-40  text-center">
        <div className="flex items-center justify-between">
          <div className="w-[90vw] md:w-[62vw] text-2xl mt-10">
            
           
            <span className="text-white font-bold">Update Your Profile Here...</span>
          </div>
        </div>
      </div>
      {/* introduction */}

      <div className="w-full md:px-16 lg:px-32 mt-16 mb-16">
      <div className="flex items-center gap-6 md:flex-row flex-col">
          <img
                src="https://images.pexels.com/photos/7190948/pexels-photo-7190948.jpeg?auto=compress&cs=tinysrgb&w=600"
                className="md:hidden lg:block md:w-[80vw] md:h-[70vh] w-full px-4 md:px-0 h-[40vh] rounded-t-xl"
              />
              <div className="w-full  ">
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              
              <div className="w-full  -mt-14 ">
                
                <div className="flex md:flex-row flex-col items-center gap-4">
                <Dropzone
                  onDrop={(acceptedFiles) => handleFileSlection(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} >
                      <input {...getInputProps()} />
                      <Avatar className="mt-16 w-36 h-36 relative group">
                        <AvatarImage
                          className=""
                          src={filePreview ? filePreview : userData?.user.avatar? userData.user.avatar : "featured1.jpeg"}
                        />
                        <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 justify-center items-center bg-black bg-opacity-20 border-2 border-blue-600 rounded-full group-hover:flex hidden cursor-pointer">
                          <IoCameraOutline color="#7c3aed" />
                        </div>
                      </Avatar>
                    </div>
                  )}
                </Dropzone>
                <div className="flex flex-col  gap-4 ">
              <div className="w-[100vw] md:w-[60vw] lg:w-[29vw] md:mt-20 px-6 lg:px-0">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black text-lg">Full Name</FormLabel>
                      <FormControl>
                        <Input
                        className="bg-gray-300"
                          placeholder="Enter your email address"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[100vw] md:w-[60vw] lg:w-[29vw] mt-3 px-6 md:px-0">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black text-lg">Email Address</FormLabel>
                      <FormControl>
                        <Input
                        className="bg-gray-300"
                          placeholder="Enter your email address"
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
              </div>
              
              <div className="mb-3 mt-5 px-6 md:mt-0 md:px-0">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black text-lg">Your Bio</FormLabel>
                      <FormControl>
                        <Textarea
                        
                        className="bg-gray-300 w-[90vw] h-[20vh] lg:w-[40vw] md:w-[80vw] lg:h-[30vh]"
                          type="password"
                          placeholder="Enter your bio"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3 px-11 hidden">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-lg">Password</FormLabel>
                      <FormControl>
                        <Input
                        
                        className="bg-gray-300"
                          placeholder="Change Your Password..."
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-10 px-6 md:px-0">
                <Button type="submit" className="md:w-[80vw] lg:w-[40vw] bg-gray-800 h-10">
                {uploading ? "Please Wait...." : "Save Changes"}
                </Button>
                
              </div>
            </form>
          </Form>
        </div>
          </div>
        
      </div>

      <Footer />
    </div>
  );
}

export default AccountPage;
