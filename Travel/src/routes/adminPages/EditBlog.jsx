import React, { useEffect, useState } from "react";
import { FiSearch, FiPlus, FiFilter, FiChevronDown } from "react-icons/fi";
import Sidebar from "../../components/adminComponents/Sidebar";
import AllPost from "../../components/adminComponents/AllPost";
import { showToast } from "../../helpers/showToast";
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
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { decode } from "entities";
import Loading from "../../components/Loading";
import { Checkbox } from "../../components/ui/checkbox";
import { toast } from "react-toastify";

function EditBlog() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log(user);
  

  // Protect the /single page route
  if (!user.isAdminLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  const blogid = useParams();

  // const { user } = useUser();

  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const { data: categoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: "get",
      credentials: "include",
    }
  );

  const { data: blogData, loading: blogLoading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/edit/${blogid?.blog_id}`,
    {
      method: "get",
      credentials: "include",
    },
    [blogid?.blog_id]
  );
 

  const formSchema = z.object({
    subcategory: z.string().min(3, "Category field must be selected."),
    category: z.string().min(3, "Category field must be 3 character long."),
    title: z.string().min(3, "Title must be at least 3 character long."),
    slug: z.string().min(3, "Slug must be 3 character long."),
    blogContent: z.string().min(3, "Blog content must be 3 character long."),
    location: z.string().min(3, "Location must be at least 3 character long."),
    isFeatured: z.boolean(),
    isFlashNews: z.boolean(),
    status: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subcategory: "",
      category: "",
      title: "",
      slug: "",
      blogContent: "",
      isFeatured: false,
      isFlashNews: false,
      location: "",
      status: "published",
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
      form.setValue("blogContent", decode(blogData.blog.blogcontent));
      form.setValue("isFeatured", blogData.blog.isFeatured);
      form.setValue("isFlashNews", blogData.blog.isFlashNesw);

      // Fetch subcategories for the selected category
      handleCategoryChange(blogData.blog.subcategory.parentCategory._id);
    }
  }, [blogData]);

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
        !values.slug ||
        !values.blogContent
      ) {
        return showToast("error", "All fields are required.");
      }

      const newValues = {
        ...values,
        author: user?.adminuser?.fullName || "Unknown Author",
      };
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      formData.append("data", JSON.stringify(newValues));

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/blog/update/${blogid.blog_id}`,
        {
          method: "put",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }

      form.reset();
      setFile();
      setFilePreview();

      navigate("/admin-posts");
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

  const handleCategoryChange = async (categoryId) => {
    form.setValue("category", categoryId);
    form.setValue("subcategory","");
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
    <div className="w-full flex">
      <div
        className={`fixed z-50 bg-gray-800 h-screen transition-transform ${
          sidebarOpen ? "translate-x-0 w-[65%]" : "-translate-x-full"
        } lg:translate-x-0 lg:w-[20%]`}
      >
        <Sidebar />
      </div>

      <div className="w-full lg:w-[80%] absolute lg:left-[20%] bg-[url(/346596-PAQ0SL-281.jpg)] bg-cover bg-no-repeat px-6 py-6 min-h-screen">
        {/* Toggle Button for Mobile */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-black text-3xl focus:outline-none"
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center justify-between w-full">
            <div>
              <h1 className="text-2xl font-semibold text-black">
                Edit your blog...
              </h1>
              <p className="text-gray-800 mt-3">Manage your blog posts</p>
            </div>
          </div>
        </div>

        <div className="">
          <Card className="w-full bg-gray-800 p-5 mb-10">
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
                                className="bg-gray-200 w-[77vw] md:w-[60vw]"
                                placeholder="Enter blog title.."
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
                            <FormLabel className="text-white text-lg">
                              Parent Category
                            </FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={(value) =>
                                  handleCategoryChange(value)
                                }
                                defaultValue={field.value}
                              >
                                <SelectTrigger className=" w-[80vw] md:w-[60vw] bg-gray-300 text-black">
                                  <SelectValue placeholder={blogData?.blog.subcategory.parentCategory.name} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem
                                    key="select-category"
                                    value="placeholder"
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
                            <FormLabel className="text-white text-lg">
                              Subcategory
                            </FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className=" w-[80vw] md:w-[60vw] bg-gray-300 text-black">
                                  <SelectValue placeholder={blogData?.blog.subcategory.name} />
                                </SelectTrigger>
                                <SelectContent>
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
                                                <FormLabel className="text-white text-lg">
                                                  Location
                                                </FormLabel>
                                                <FormControl>
                                                  <Input
                                                    className="bg-gray-200 w-[80vw] md:w-[60vw]"
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
                    <span className="text-white pb-4 text-lg">
                      Featured Image
                    </span>
                    <Dropzone
                      onDrop={(acceptedFiles) =>
                        handleFileSlection(acceptedFiles)
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />

                          <div className="flex justify-center items-center w-[60vw] md:w-44 h-44 border-2 border-dashed rounded cursor-pointer">
                            {filePreview && (
                              <img src={filePreview} alt="Preview" />
                            )}
                          </div>
                        </div>
                      )}
                    </Dropzone>
                  </div>
                </div>

                <div className="mb-3 hiddenn">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-lg">
                          Slug
                        </FormLabel>
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

                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="blogContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-lg">
                          Blog Content
                        </FormLabel>
                        <FormControl>
                          <Editor
                            initialData={field.value || ""}
                            onChange={handleEditorData}
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
                    name="isFeatured"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center justify-start gap-3">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="bg-white"
                            />

                            <FormLabel className="text-white text-lg ">
                              Is this a Featured Blog ?
                            </FormLabel>
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="isFlashNews"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center justify-start gap-3">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="bg-white"
                            />

                            <FormLabel className="text-white text-lg ">
                              Is this a Flash News ?
                            </FormLabel>
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-5 text-right">
                  {blogData?.blog.status === "pending" ? (
                    <div className="">
                      <Button
                        type="submit"
                        variant="secondary"
                        className="w-[30vw] md:w-[20vw] lg:w-[10vw]"
                      >
                        Publish
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-3 text-right">
                      <Button
                        type="submit"
                        className="w-[30vw] md:w-[20vw] lg:w-[10vw] bg-blue-500 text-white"
                      >
                        Update Blog
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default EditBlog;
