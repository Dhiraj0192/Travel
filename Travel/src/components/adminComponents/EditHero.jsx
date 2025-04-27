import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { getEnv } from '../../helpers/getEnv';
import { Card } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import Dropzone from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { Button } from '../ui/button';
import { useFetch } from '../../hooks/userFetch';

function EditHero() {
    const navigate = useNavigate();
    const [filePreview, setFilePreview] = useState();
    const [heroid, setHeroid] = useState();
      const [uploading, setUploading] = useState(false);
      const [file, setFile] = useState();

    const { data: HeroData } = useFetch(
        `${getEnv("VITE_API_BASE_URL")}/herosection/`,
        {
          method: "get",
          credentials: "include",
        },
        
    );
    console.log(HeroData);
    

    const formSchema = z.object({
        title: z.string().min(3, "Title must be at least 3 character long."),
      });
    
      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
        },
      });

      useEffect(() => {
          if (HeroData?.heroSections != null) {
            setFilePreview(HeroData?.heroSections?.featuredImage);
            setHeroid(HeroData?.heroSections._id);
            
            form.setValue("title", HeroData?.heroSections.title);
            
          }
        }, [HeroData]);
    
      async function onSubmit(values) {
        try {
          setUploading(true);
    
          // console.log(newValues);
    
          const newValues = {
            ...values,
          };
          // console.log(newValues);
    
          
          const formData = new FormData();
          if (file) {
            formData.append("file", file); 
          }
          formData.append("data", JSON.stringify(newValues));
    
          const response = await fetch(
            `${getEnv("VITE_API_BASE_URL")}/herosection/update/${heroid ? heroid : ""}`,
            {
              method: "put",
              credentials: "include",
              body: formData,
            }
          );
    
          const data = await response.json();
          if (!response.ok) {
            setUploading(false);
            return ;
            
          }
    
          form.reset();
    
          setFile();
          setFilePreview();
    
          setUploading(false);
          navigate("/admin-dashboard");
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
    
      const handleFileSlection = (files) => {
        const file = files[0];
        const preview = URL.createObjectURL(file);
        setFile(file);
        setFilePreview(preview);
      };
  return (
    <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-black">
              Let's Edit Traveler's Hero Section Content
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
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white text-lg">
                              Title
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="bg-gray-200 w-[73vw]"
                                placeholder="Enter Hero Section title.."
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mb-3 ">
                      <span className="text-white pb-4 text-lg">
                        Hero Section Image
                      </span>
                      <Dropzone
                        onDrop={(acceptedFiles) =>
                          handleFileSlection(acceptedFiles)
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />

                            <div className="flex justify-center items-center w-[73vw] h-[40vh] border-2 border-dashed rounded cursor-pointer">
                              {filePreview === undefined ? (
                                <div className="flex items-center gap-2 ">
                                  <p className="text-black">Upload</p>
                                  <FaCloudUploadAlt />
                                </div>
                              ) : (
                                <img
                                  src={filePreview}
                                  className="w-[73vw] h-[40vh]"
                                  alt=""
                                  srcset=""
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </Dropzone>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <Button type="submit" className="w-full bg-blue-500">
                    {uploading ? "Please Wait...." : "Update"}
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>
    </div>
  )
}

export default EditHero