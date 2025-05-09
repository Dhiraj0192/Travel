import { SignIn, useAuth } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Image from '../../components/Image';
import { Card } from '../../components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { setAdminUser } from '../../redux/user/user.slice';
import { getEnv } from '../../helpers/getEnv';


function AdminLoginPage() {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isSignedIn) {
        navigate('/admin-dashboard'); // Redirect to /home after login
      }
    }, [isSignedIn, navigate]);
    const [open , setOpen] = useState(false);

    const dispath = useDispatch()

  
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
        `${getEnv("VITE_API_BASE_URL")}/adminuser/login`,
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
      // console.log(data);
      
      // console.log(data.data.logedInUserer);
      

      dispath(setAdminUser(data.data.logedInUserer))
      setUploading(false)
      navigate("/admin-dashboard");
      // toast(data.message, {
      //   position: "top-right",
      //   autoClose: 1000,
      //   hideProgressBar: false,
      //   closeOnClick: false,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
        
      //   });
      // showToast("success", data.message);
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
        <Link to={`${isSignedIn ? '/home' : '/'}`} className="flex items-center gap-4 text-xl md:text-2xl font-bold">
            
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
                        to="/admin-register"
                      >
                        Sign Up
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
  )
}

export default AdminLoginPage