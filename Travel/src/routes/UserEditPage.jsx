import React, { useEffect, useState } from "react";
import Image from "../components/Image";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
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
import Navbar from "../components/Navbar";
import { decode } from "entities";
import { toast } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";
import UserIcon from "../components/UserIcon";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function UserEditPage() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const blogid = useParams();

  // Protect the /single page route
  if (!user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();

  const [uploading, setUploading] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  let blogDesc;

  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`, {
    method: "get",
    credentials: "include",
  });

  const { data: blogData, loading: blogLoading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/edit/${blogid?.blog_id}`,
    {
      method: "get",
      credentials: "include",
    },
    [blogid?.blog_id]
  );

  blogDesc = blogData?.blog.blogcontent;
 

  const formSchema = z.object({
    subcategory: z.string().min(3, "Category field must be selected."),
    category: z.string().min(3, "Category field must be 3 character long."),
    title: z.string().min(3, "Title must be at least 3 character long."),
    slug: z.string().min(3, "slug must be 3 character long."),
    blogcontent: z.string().min(3, "Blog content must be 3 character long."),
    location: z.string().min(3, "Location must be at least 3 character long."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subcategory: blogData?.blog.subcategory._id,
      category: blogData?.blog.subcategory.parentCategory._id,
      title: "",
      slug: "",
      blogcontent: "",
      location: "",
    },
  });

  useEffect(() => {
    if (blogData) {
      setFilePreview(blogData.blog.featuredimage);
      form.setValue("category", blogData.blog.subcategory.parentCategory._id);
      form.setValue("subcategory", blogData.blog.subcategory._id);
      form.setValue("location", blogData.blog.location);
      form.setValue("title", blogData.blog.title);
      form.setValue("slug", blogData.blog.slug);
      form.setValue("blogcontent", decode(blogDesc));
      // Fetch subcategories for the selected category
      handleCategoryChange(blogData.blog.subcategory.parentCategory._id);
    }
  }, [blogData]);

  const handleEditorData = (event, editor) => {
    const data = editor.getData();
    form.setValue("blogcontent", data);
  };

  const blogTitle = form.watch("title");
  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true });
      form.setValue("slug", slug);
    }
  }, [blogTitle]);

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
        authorid: user?.user._id,
        author: user?.user.name,
        authorimage:
          user?.user.avatar ||
          "https://www.flaticon.com/free-icon/user_9187604",
        role: user?.user.role,
      };

      const formData = new FormData();
      if (file) {
        formData.append("file", file); // Add file only if it exists
      }

      formData.append("data", JSON.stringify(newValues));
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/blog/update-user-blog/${
          blogid.blog_id
        }`,
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

      form.reset();
      setFile();
      setFilePreview();
      setUploading(false);
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

      navigate("/your-blogs");
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

  const handleCategoryChange = async (categoryId) => {
    form.setValue("category", categoryId);
    form.setValue("subcategory", "");
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/category/subcategories/${categoryId}`,
        {
          method: "get",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSubcategories(data.subcategories || []);
      } else {
        console.error(data.message);
        setSubcategories([]);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubcategories([]);
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <UserIcon />
      <div className="w-full h-[25vh] lg:h-[32vh] overflow-hidden bg-gradient-to-b from-[#879cbf8b] to-[#1a1c208b] bg-opacity-5">
        <Image
          src="pexels-fmaderebner-238622.jpg"
          className="w-full h-[32vh] lg:h-[50vh] absolute top-0 -z-10 bg-cover "
        />
        {/* breadcrumb */}
        <div className="h-[30vh] flex flex-col justify-center">
          {/* introduction */}
          <div className="lg:px-32 flex items-center justify-between">
            <div className=" w-full md:w-[60vw] ">
              <h1 className="text-white text-center text-xl md:text-3xl lg:text-5xl font-bold md:text-center">
                Edit your content, engage with readers, and grow audience.
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-6 lg:px-32 w-full mt-10 mb-10">
        <h1 className="text-gray-600 font-bold text-xl">
          Let's Edit Blog Here...
        </h1>

        <div className=" mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex md:flex-row flex-col items-center justify-between w-full">
                <div className="flex flex-col items-start">
                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-500 text-xl  md:text-3xl ">
                            Write Blog Title Here...
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-gray-200 h-10 
                                     file:text-2xl
                                    focus-visible:outline-none
                                    focus-visible:border-0
                                    w-[90vw] md:w-[69vw]"
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
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black text-lg">
                            Parent Category
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) =>
                                handleCategoryChange(value)
                              }
                              defaultValue={field.value}
                            >
                              <SelectTrigger className=" w-[80vw] md:w-[69vw] bg-gray-300 text-black">
                                <SelectValue
                                  placeholder={
                                    blogData?.blog.subcategory.parentCategory
                                      .name
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem
                                  key="select-category"
                                  value={blogData?.blog.subcategory.name}
                                >
                                  Select Category
                                </SelectItem>
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

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="subcategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black text-lg">
                            Sub Category
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className=" w-[80vw] md:w-[69vw] bg-gray-300 text-black">
                                <SelectValue
                                  placeholder={blogData?.blog.subcategory.name}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem
                                  key="select-subcategory"
                                  value={blogData?.blog.subcategory.name}
                                >
                                  Select Sub Category
                                </SelectItem>
                                {subcategories.length > 0 ? (
                                  subcategories.map((subcategory) => (
                                    <SelectItem
                                      key={subcategory._id}
                                      value={subcategory._id}
                                    >
                                      {subcategory.name}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem value="no-subcategories">
                                    No Subcategories
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
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
                          <FormLabel className="text-black text-lg">
                            Location
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-gray-200 w-[80vw] md:w-[69vw]"
                              placeholder="Enter location.."
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
                          {filePreview === undefined && (
                            <div className="flex items-center gap-2">
                              <p className="text-black">Upload</p>
                              <FaCloudUploadAlt />
                            </div>
                          )}
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
                              initialData: blogData?.blog.blogcontent,
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

              <div className="mt-5 text-left md:text-right">
                <Button type="submit" className="w-[20vw] bg-gray-700">
                  {uploading ? "Please Wait...." : "Update Blog"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserEditPage;
