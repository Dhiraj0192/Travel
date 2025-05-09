import React, { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/userFetch';
import { getEnv } from '../../helpers/getEnv';
import { Card } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import slugify from 'slugify';
import { Input } from '../ui/input';
import { toast } from 'react-toastify';

function AddSubCategory() {
    const [editSubClicked, setEditSubClicked] = useState(false);
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
        subcategory: z.string().min(3, "Category field must be selected."),
          name: z.string().min(3, "Category field must be 3 character long."),
          slug: z.string().min(3, "Slug field must be 3 character long."),
        });
      
        const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
            subcategory:"",
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
      
          
      
        async function onSubmit(values) {
            
            
            
            
              
          try {
            setUploading(true);
            const response = await fetch(
              `${getEnv("VITE_API_BASE_URL")}/category/add-sub`,
              {
                method: "post",
                headers: { "Content-type": "application/json" },
                credentials: "include",
                body: JSON.stringify(values),
              }
            );
      
            const data = await response.json();
            if (!response.ok) {
              setUploading(false);
              return showToast("error", data.message);
            }
            setUploading(false);
            form.reset()
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
    <div>
        {/* add sub categories */}

        {!editSubClicked ? <div className="">
          <Card className="w-full bg-gray-800 p-5 mb-10">
            <h1 className="text-white text-2xl font-bold mb-5">Add Sub Category</h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex items-center gap-4">
              <div className="mb-3">
                      <FormField
                        control={form.control}
                        name="subcategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white text-lg">
                              Parent Category
                            </FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className=" w-[80vw] md:w-[30vw] bg-gray-300 text-black">
                                  <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem
                                    key="select-category"
                                    value={`${
                                      field.value != ""
                                        ? field.value
                                        : "Select Category"
                                    }`}
                                  >
                                    
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-lg">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-200 w-[42vw]"
                            placeholder="Enter your category name.."
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                  {uploading ? "Please Wait...." : "Add New Sub Category"}
                    
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>: <EditCategory/>}
    </div>
  )
}

export default AddSubCategory