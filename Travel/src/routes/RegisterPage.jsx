import { SignUp } from "@clerk/clerk-react";
import React from "react";
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

function RegisterPage() {
  const dispath = useDispatch()
  const navigate = useNavigate();

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
        return showToast("error", data.message);
      }

      navigate("/login");
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }
  return (
    <div className="w-full h-screen">
      <div className="w-full lg:px-32">
        <div className="flex items-center justify-between gap-0">
          <div className="mt-0 w-[63%] h-[84vh] flex flex-col justify-end pr-10 pt-10 pb-40 pl-10 rounded-3xl ">
            <p className="text-7xl font-bold">Share Your Story</p>
            <span className="text-6xl font-bold text-blue-800 mt-5">
              {" "}
              With The World
            </span>
            <p className="mt-10 text-xl text-black font-semibold">
              Create, publish and connect with readers on our modern blogging
              platform. Simple to use, powerful to grow your audience.
            </p>

            <div className="w-[81vw] h-2 bg-blue-800 rounded-3xl absolute top-44 right-28"></div>
            <div className="w-[70vw] h-2 bg-blue-800 rounded-3xl absolute top-40 right-28"></div>
            <div className="w-[61vw] h-2 bg-blue-800 rounded-3xl absolute top-36 right-28"></div>
          </div>
          <div className="pt-10 pb-10 mt-20">
            <Card className="w-[400px] p-5">
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
                      Sign Up
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
                    <div className="mt-5 w-full flex justify-center">
                      <GoogleLogin
                        onSuccess={async (credentialResponse) => {
                          try {
                            console.log(
                              jwtDecode(credentialResponse.credential)
                            );
                            const user = jwtDecode(
                              credentialResponse.credential
                            );
                            const bodyData = {
                              name: user.name,
                              email: user.email,
                              avatar: user.picture,
                            };
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

                          navigate("/home");
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

export default RegisterPage;
