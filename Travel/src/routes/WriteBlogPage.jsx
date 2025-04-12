import React, { useEffect, useState } from "react";
import Image from "../components/Image";
import { Link, Navigate } from "react-router-dom";
import { useFetch } from "../hooks/userFetch";
import { getEnv } from "../helpers/getEnv";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import Dropzone from "react-dropzone";
import { Button } from "../components/ui/button";
import Editor from "../components/Editor";
import slugify from "slugify";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { showToast } from "../helpers/showToast";

function WriteBlogPage() {
    const user = useSelector((state) => state.user);
      
    
      // Protect the /single page route
      if (!user.isLoggedIn) {
        return <Navigate to="/login" replace />;
      }
    
    
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();
   const [uploading, setUploading] = useState(false);
  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`, {
    method: "get",
    credentials: "include",
  });

  const formSchema = z.object({
    category: z.string().min(3, "Category field must be selected."),
    title: z.string().min(3, "Title must be at least 3 character long."),
    slug: z.string().min(3, "slug must be 3 character long."),
    blogContent: z.string().min(3, "Blog content must be 3 character long."),
    isFeatured: z.boolean(),
    status: z.string()
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      blogContent: "",
      isFeatured: false,
      status : "pending",
    },
  });

  const handleEditorData = (event, editor) => {
    const data = editor.getData();
    form.setValue("blogContent", data);
  };

  const blogTitle = form.watch("title");
  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true });
      form.setValue("slug", slug);
    }
  }, [blogTitle]);

  async function onSubmit(values) {
    try {
      setUploading(true);
      const newValues = {
        ...values,
        author: user?.user.name,
        authorimage: user?.user.avatar || "https://www.flaticon.com/free-icon/user_9187604",
        role: user?.user.role
      };
      console.log(newValues);

      if (!file) {
        showToast("error", "Featured image required.");
        setUploading(false);
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(newValues));
      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/blog/add`, {
        method: "post",
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
      showToast("success", data.message);
    } catch (error) {
      setUploading(false);
      showToast("error", error.message);
    }
  }

  const handleFileSlection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };
  return (
    <div className="flex flex-col">
      <div className="w-full h-[30vh] overflow-hidden bg-gradient-to-b from-[#879cbf8b] to-[#1a1c208b] bg-opacity-5">
        <Image
          src="pexels-fmaderebner-238622.jpg"
          className="w-full h-[40vh] absolute top-0 -z-10 bg-cover "
        />
        {/* breadcrumb */}
        <div className="h-[30vh] flex flex-col justify-center">
          {/* introduction */}
          <div className="lg:px-32 flex items-center justify-between">
            <div className=" w-[60vw]">
              <h1 className="text-white text-xl md:text-5xl lg:text-5xl font-bold">
                Write your content, engage with readers, and grow audience.
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:px-32 w-full mt-10 mb-10">
        <h1 className="text-gray-600 font-bold text-xl">Let's Create A New Blog</h1>

        <div className=" mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-start">
                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-500 text-3xl ">
                            Write Blog Title Here...
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-gray-200 h-10 
                               file:text-2xl
                              focus-visible:outline-none
                              focus-visible:border-0
                              w-[69vw]"
                              
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mb-3 mt-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center justify-start gap-2">
                            <FormLabel className="text-gray-500 text-2xl w-[14vw]">
                            Select Category
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-[54vw] bg-gray-200 text-black">
                                <SelectValue placeholder="All Category..." />
                              </SelectTrigger>
                              <SelectContent>
                                {categoryData ? (
                                  categoryData.category.map((category) => (
                                    <SelectItem
                                      key={category._id}
                                      value={category._id}
                                    >
                                      {category.name}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <></>
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                            </div>
                          

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="mb-3 ">
                <FormLabel className="text-gray-500 text-xl w-[14vw]">
                            Featured Image
                          </FormLabel>
                  <Dropzone
                    onDrop={(acceptedFiles) =>
                      handleFileSlection(acceptedFiles)
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />

                        <div className="flex justify-center items-center w-44 h-44 border-2 border-gray-500 border-dashed rounded cursor-pointer">
                          <img src={filePreview} alt="" srcset="" />
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>

              <div className="mb-3 hidden">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-lg">Slug</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-gray-300"
                          placeholder="Enter your slug"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3 mt-4">
                <FormField
                  control={form.control}
                  name="blogContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500 text-2xl">
                        Blog Content...
                      </FormLabel>
                      <div className="mt-6">
                      <FormControl>
                        <Editor
                          props={{
                            initialData: "",
                            onChange: handleEditorData,
                          }}
                        />
                      </FormControl>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-5 text-right">
                <Button type="submit" className="w-[20vw] bg-gray-700">
                {uploading ? "Please Wait...." : "Add Blog"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default WriteBlogPage;
