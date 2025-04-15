import React, { useState } from "react";
import Sidebar from "../../components/adminComponents/Sidebar";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MdMessage, MdStarRate } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa6";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import CategoriesManagement from "../../components/adminComponents/AllCategories";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getEnv } from "../../helpers/getEnv";
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
import { useEffect } from "react";
import slugify from "slugify";
import { useFetch } from "../../hooks/userFetch.js";
import EditCategory from "../../components/adminComponents/EditCategory";
import { useAuth } from "@clerk/clerk-react";

function Categories() {
  const navigate = useNavigate()
    const { isSignedIn } = useAuth();
    if (isSignedIn === false) {
  
      navigate('/admin-login');
      
    }
  
  const [editClicked, setEditClicked] = useState(false);
  

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCategories(items);
  };

  
  const formSchema = z.object({
    name: z.string().min(3, "Category field must be 3 character long."),
    slug: z.string().min(3, "Slug field must be 3 character long."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

 

  const categoryName = form.watch("name");
  useEffect(() => {
    
    if (categoryName) {
      const slug = slugify(categoryName, { lower: true });
      form.setValue("slug", slug);
    }
  },[categoryName]);

    const { data: categoryCount } = useFetch(
      `${getEnv("VITE_API_BASE_URL")}/category/category-count`,
      {
        method: "get",
        credentials: "include",
      }
    );

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/category/add`,
        {
          method: "post",
          headers: { "Content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      form.reset()
      navigate("/admin-categories");
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }


  return (
    <div className="w-full flex">
      <div className="w-[20%] h-screen fixed">
        <Sidebar />
      </div>

      <div className="w-[80%] absolute left-[20%] bg-gray-900 px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white">Categories</h1>
            <p className="text-gray-300 mt-3">
              Organize your content with categories
            </p>
          </div>

          <button onClick={()=>setEditClicked(false)} className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <FiPlus /> Add Category
          </button>
        </div>

        <div className="flex items-center gap-3 mt-3 mb-10 w-full">
          {/* total posts */}

          <div className="rounded-lg bg-gray-600 w-1/2 p-4 flex items-center justify-start gap-4">
            <div className="w-10 h-10 rounded-full bg-green-700 flex justify-center items-center">
              <BsFileEarmarkPostFill className="w-5 h-5 text-green-400" />
            </div>

            <div className="flex flex-col  items-start">
              <p className="text-gray-300 ">Total Categories</p>
              <p className="font-semibold text-white text-2xl">{categoryCount?.totalCategory}</p>
            </div>
          </div>

          {/* total comments */}

          <div className="rounded-lg bg-gray-600 w-1/2 p-4 flex items-center justify-start gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-700 flex justify-center items-center">
              <MdMessage className="w-5 h-5 text-purple-400" />
            </div>

            <div className="flex flex-col  items-start">
              <p className="text-gray-300 ">Most Used</p>
              <p className="font-semibold text-white text-2xl">Travel</p>
            </div>
          </div>

          {/* Unique Visitors */}

          
        </div>

        {/* add categories */}

        {!editClicked ? <div className="">
          <Card className="w-full bg-gray-600 p-5 mb-10">
            <h1 className="text-white text-2xl font-bold mb-5">Add Category</h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-lg">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-200"
                            placeholder="Enter your category name.."
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
                <div className="mt-5">
                  <Button type="submit" className="w-full bg-blue-500">
                    Add New Category
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>: <EditCategory/>}

        {/* edit category */}



        <CategoriesManagement editClicked={editClicked} setEditClicked={setEditClicked}/>

        {/* Category Hierarchy Section */}
        {/* <div className="p-6 bg-gray-600 mt-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-semibold text-white mb-4">
            Category Hierarchy
          </h1>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="categories">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {categories.map((category, index) => (
                    <Draggable
                      key={category.id}
                      draggableId={category.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border-y-2 border-gray-200 rounded-lg p-4 bg-gray-600"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-medium">
                                {category.name} ({category.count})
                              </span>
                            </div>
                            <button className="text-gray-500 hover:text-gray-700">
                              <FiMinus className="h-5 w-5" />
                            </button>
                          </div>

                          {category.children &&
                            category.children.length > 0 && (
                              <div className="ml-6 mt-3 space-y-2">
                                {category.children.map((child) => (
                                  <div
                                    key={child.id}
                                    className="flex items-center justify-between py-2 px-3 bg-white rounded border border-gray-200"
                                  >
                                    <span>
                                      {child.name} ({child.count})
                                    </span>
                                    <button className="text-gray-500 hover:text-gray-700">
                                      <FiMinus className="h-5 w-5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div> */}
      </div>
    </div>
  );
}

export default Categories;
