import { SignIn } from "@clerk/clerk-react";
import React, { useState } from "react";
import Footer from "../components/Footer";
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
import { showToast } from "../helpers/showToast.js";
import { getEnv } from "../helpers/getEnv.js";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";
import {useDispatch} from 'react-redux'
import { setUser } from "../redux/user/user.slice.js";
import { toast } from "react-toastify";

function LoginPage() {

  const dispath = useDispatch()

  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, "Password field required."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      setUploading(true)
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/login`,
        {
          method: "post",
          headers: { "Content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        setUploading(false)
        return showToast("error", data.message);
      }

      dispath(setUser(data.user))
      setUploading(false)
      navigate("/home");
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
      // showToast("success", data.message);
    } catch (error) {
      setUploading(false)
      showToast("error", error.message);
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
            <p className="mt-10 text-md text-black mb-10">
              Create, publish and connect with readers on our modern blogging
              platform. Simple to use, powerful to grow your audience.
            </p>

            <div className="hidden lg:block w-[81vw] h-2 bg-blue-800 rounded-3xl absolute bottom-10 right-28 "></div>
            <div className="hidden lg:block w-[70vw] h-2 bg-blue-800 rounded-3xl absolute bottom-14 right-28"></div>
          </div>
          <div className="">
            {/* <SignIn signUpUrl='/register'/> */}
            <Card className="w-[400px] p-7 mb-10">
              <h1 className="text-2xl font-bold text-center mb-5">
                Login Into Account
              </h1>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  <div className="mt-5">
                    <Button type="submit" className="w-full bg-blue-600">
                    {uploading ? "Please Wait...." : "Log In"}
                      
                    </Button>
                    <div className="mt-5 text-sm flex justify-center items-center gap-2">
                      <p>Don&apos;t have account?</p>
                      <Link
                        className="text-blue-500 hover:underline"
                        to="/register"
                      >
                        Sign Up
                      </Link>
                    </div>
                    <div className="mt-5 w-full flex justify-center">
                      <GoogleLogin
                        onSuccess={async (credentialResponse) => {
                          try {
                            console.log(
                              jwtDecode(credentialResponse.credential)
                            );
                            const user = jwtDecode(credentialResponse.credential)
                            const bodyData = {
                              name : user.name,
                              email: user.email,
                              avatar: user.picture
                            }
                            const response = await fetch(
                              `${getEnv(
                                "VITE_API_BASE_URL"
                              )}/auth/google-login`,
                              {
                                method: "post",
                                headers: { "Content-type": "application/json" },
                                credentials: "include",
                                body: JSON.stringify(bodyData),
                              }
                            );

                            const data = await response.json();
                            if (!response.ok) {
                              return showToast("error", data.message);
                            }

                            dispath(setUser(data.user))
                            navigate("/home");
                            showToast("success", data.message);
                          } catch (error) {
                            showToast("error", error.message);
                          }

                        }}
                        onError={() => console.log("Login Failed")}
                        auto_select={true}
                      />
                    </div>
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

export default LoginPage;
