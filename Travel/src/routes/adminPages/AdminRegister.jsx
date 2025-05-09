import { SignUp, useAuth } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Image from '../../components/Image'
import { Card } from '../../components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { toast } from 'react-toastify';
import { getEnv } from '../../helpers/getEnv';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';


function AdminRegisterPage() {
    
    const navigate = useNavigate();
  
    const user = useSelector((state) => state.user);
  // console.log(user);
  

  // Protect the /single page route
  if (!user.isAdminLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }
    const [open , setOpen] = useState(false);
    // const dispath = useDispatch()
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
          `${getEnv("VITE_API_BASE_URL")}/adminuser/register`,
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
  
        navigate("/admin-login");
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
        <div className='sticky top-0 overflow-hidden z-30 bg-black px-6 md:px-32 w-full h-16 md:h-20 flex items-center justify-between'>
        {/* logo */}
        <Link to={`${user?.isAdminLoggedIn ? '/home' : '/'}`} className="flex items-center gap-4 text-xl md:text-2xl font-bold">
            
            <span className='text-white'>Traveler's Mirror Admin</span>
        </Link>
        
        
    </div>
        
      <div className='w-full lg:px-32'>
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-0  md:mt-0 ">
      <div className='md:mt-5 w-[95vw] md:w-[63%] h-[55vh] md:h-[83vh] flex flex-col justify-center pr-10 md:pt-10 pb-10 pl-10 rounded-3xl'>
                <p className="text-2xl md:text-3xl lg:text-5xl font-bold">Grab control on blog</p>
                <span className='text-2xl md:text-2xl lg:text-5xl font-bold text-blue-800 mt-3'> With The Dashboard</span>
                <p className='mt-10 text-xl text-black md:font-semibold'>Create, publish and connect with readers on our modern blogging platform. Simple to use, powerful to grow your audience.</p>

                <div className="w-[81vw] h-2 bg-blue-800 rounded-3xl md:absolute bottom-10 right-28 mt-3 md:mt-0"></div>
                <div className="w-[70vw] h-2 bg-blue-800 rounded-3xl md:absolute bottom-14 right-28 mt-3 md:mt-0"></div>
                
            </div>
            <div className="mb-10 ml-4 md:mb-0 md:ml-0">
            <div className="pt-12 md:pt-10 pb-10 md:mt-0">
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
                        to="/admin-login"
                      >
                        Log In
                      </Link>
                    </div>
                    
                  </div>
                </form>
              </Form>
            </Card>
          </div>
            </div>
        </div>

        
        
        
    </div>
    
    </div>
    
  )
}

export default AdminRegisterPage