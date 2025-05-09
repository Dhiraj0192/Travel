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
import { number, z } from "zod";
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
import { FaCloudUploadAlt } from "react-icons/fa";

function AddLinks() {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  if (isSignedIn === false) {
    navigate("/admin-login");
  }
  const { user } = useUser();

  // const user = useSelector((state)=> state.user)

  const [filePreview, setFilePreview] = useState();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState();


    

  const formSchema = z.object({
    number: z.string().min(9, "Number must be at least 9 character long."),
    email: z.string(),
    location: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: "",
      email: "",
      location: "",
    },
  });

  async function onSubmit(values) {
    try {
      setUploading(true);
      

     

      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/other/add/${values?.number}/${values?.email ? values?.email : "null"}/${values?.location ? values?.location : "null"}`, {
        method: "post",
        credentials: "include",
        
      });

      const data = await response.json();
      if (!response.ok) {
        setUploading(false);
        return showToast("error", data.message);
      }

      form.reset();

      setUploading(false);
      toast("Data Added", {
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
      <div className="">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-black">
              Add other contact details
            </h1>
          </div>
        </div>

        {/* add categories */}

        <div className="">
          <Card className="w-full bg-gray-800 p-5 mb-10">
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col items-start">
                    <div className="mb-3">
                      <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white text-lg">
                              Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="bg-gray-200 w-[73vw]"
                                placeholder="Enter Number.."
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
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white text-lg">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="bg-gray-200 w-[73vw]"
                                placeholder="Enter Email.."
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
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white text-lg">
                              Location
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="bg-gray-200 w-[73vw]"
                                placeholder="Enter Location.."
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
                    {uploading ? "Please Wait...." : "Save"}
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

export default AddLinks;
