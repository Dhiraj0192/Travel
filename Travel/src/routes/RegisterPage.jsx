import { SignUp } from "@clerk/clerk-react";
import React, { useState } from "react";
import Footer from "../components/Footer";
import { SignIn } from "@clerk/clerk-react";
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
import { Link, useNavigate } from "react-router-dom";
import { getEnv } from "../helpers/getEnv.js";
import { showToast } from "../helpers/showToast.js";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import {useDispatch} from 'react-redux'
import { setUser } from "../redux/user/user.slice.js";
import { toast } from "react-toastify";

function RegisterPage() {
  const dispath = useDispatch()
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const formSchema = z.object({
    name: z.string().min(3, "Name must be atleast 3 character long."),

    email: z.string().email(),
    password: z.string().min(8, "Password must be 8 character long"),
    confirmPassword: z
      .string()
      .refine(
        (data) => data.password === data.confirmPassword,
        "Password and Confirm Password should be same."
      ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setUploading(true)
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/register`,
        {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        setUploading(false)
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
      setUploading(false)

      navigate("/login");
      toast(data.message, {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              
              });
      
    } catch (error) {
      setUploading(false)
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
    <div className="w-full h-screen">
      <div className="w-full lg:px-32">
        <div className="flex md:flex-row flex-col items-center justify-between gap-0">
          <div className="w-full md:w-[63%] md:h-[84vh] flex justify-center flex-col lg:justify-end pr-10  lg:pb-40 pl-10 rounded-3xl pt-10 md:pt-0">
            <p className="text-3xl md:text-5xl lg:text-7xl font-bold">Share Your Story</p>
            <span className="text-4xl md:text-4xl lg:text-6xl font-bold text-blue-800 mt-2 md:mt-5">
              {" "}
              With The World
            </span>
            <p className="mt-10 text-md text-black ">
              Create, publish and connect with readers on our modern blogging
              platform. Simple to use, powerful to grow your audience.
            </p>

            <div className="hidden md:block w-[81vw] h-2 bg-blue-800 rounded-3xl absolute top-56 right-28"></div>
            <div className="hidden md:block w-[70vw] h-2 bg-blue-800 rounded-3xl absolute top-52 right-28"></div>
            
          </div>
          <div className="pt-12 md:pt-10 pb-10 md:mt-20">
            <Card className="w-[400px] p-7 ">
              <h1 className="text-2xl font-bold text-center mb-5">
                Create Your Account
              </h1>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email address"
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
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
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
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password again"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-5">
                    <Button type="submit" className="w-full bg-blue-600">
                      
                      {uploading ? "Please Wait...." : "Sign Up"}
                    </Button>
                    <div className="mt-5 text-sm flex justify-center items-center gap-2">
                      <p>Already have an account?</p>
                      <Link
                        className="text-blue-500 hover:underline"
                        to="/login"
                      >
                        Log In
                      </Link>
                    </div>
                    <div className="mt-3 w-full flex justify-center">
                                          <a
                                            href="#"
                                            onClick={async (e) => {
                                              e.preventDefault();
                                              window.location.href = `${getEnv("VITE_API_BASE_URL")}/auth/google`;
                                            }}
                                            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2  rounded shadow hover:bg-gray-100 transition-colors"
                                            
                                          >
                                            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" style={{ width: 22, height: 22, marginRight: 3 }} />
                                            <span className="text-sm">Sign in with Google</span>
                                          </a>
                                        </div>
                    
                                        {/* Handle Google OAuth callback response */}
                                        {window.location.pathname === '/home' && new URLSearchParams(window.location.search).get('user') && (() => {
                                          try {
                                            const user = JSON.parse(decodeURIComponent(new URLSearchParams(window.location.search).get('user')));
                                            dispath(setUser(user));
                                            // Optionally, remove user param from URL
                                            window.history.replaceState({}, document.title, window.location.pathname);
                                          } catch (e) { }
                                        })()}
                  </div>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterPage;
