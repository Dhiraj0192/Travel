import React, { useEffect } from 'react'
import { Card } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from 'shards-react'
import { useFetch } from '../../hooks/userFetch.js'
import { getEnv } from '../../helpers/getEnv.js'
import { showToast } from '../../helpers/showToast.js'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import slugify from 'slugify'

function EditCategory() {
    const navigate = useNavigate();
    const {category_id} = useParams()

    const {data: categoryData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/show/${category_id}`,{
      method : 'get',
      credentials: 'include'
    },[category_id])

    

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
    
      useEffect(() => {
        
        if (categoryData) {
       
          form.setValue('name',categoryData.category.name)
          form.setValue('slug',categoryData.category.slug)
        }
      },[categoryData]);
    
      async function onSubmit(values) {
        try {
          const response = await fetch(
            `${getEnv("VITE_API_BASE_URL")}/category/update/${category_id}`,
            {
              method: "put",
              headers: { "Content-type": "application/json" },
              credentials: "include",
              body: JSON.stringify(values),
            }
          );
    
          const data = await response.json();
          if (!response.ok) {
            return showToast("error", data.message);
          }
          
          navigate("/admin-categories");
          showToast("success", data.message);
        } catch (error) {
          showToast("error", error.message);
        }
      }
  return (
    <div>
        <div className="">
          <Card className="w-full bg-gray-600 p-5 mb-10">
            <h1 className="text-white text-2xl font-bold mb-5">Edit Category</h1>
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
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>
    </div>
  )
}

export default EditCategory