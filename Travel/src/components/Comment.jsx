import React, { useState } from "react";
import { FaComments } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "../components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getEnv } from "../helpers/getEnv";
import { showToast } from "../helpers/showToast";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useSelector } from "react-redux";
import CommentList from "./CommentList";
import { toast } from "react-toastify";

function Comment({ props }) {
  const [newComment, setNewComment] = useState();
  const user = useSelector((state) => state.user);
  const formSchema = z.object({
    comment: z.string().min(3, "Comment field must be 3 character long."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values) {
    try {
      if (user.isLoggedIn === false) {
        return toast("Please Login to Comment!", {
                                position: "top-left",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                                
                                });
      }else{
        const newValues = {
          ...values,
          blogid: props.blogid,
          author: user.user._id,
        };
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/comment/add`,
          {
            method: "post",
            headers: { "Content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify(newValues),
          }
        );
  
        const data = await response.json();
        if (!response.ok) {
          return showToast("error", data.message);
        }
        setNewComment(data.comment);
        form.reset();
  
        toast(data.message, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          
          });
      }
    } catch (error) {
      toast(error.message, {
        position: "top-left",
        autoClose: 2000,
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
      <h4 className="flex items-center gap-2 text-2xl">
        <FaComments className="text-blue-800" /> Comment
      </h4>

      <div className="mt-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Type your comment here..."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-5">
              <Button type="submit" className=" bg-gray-700">
                Add Comment
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="border-gray-600 border-t mt-5 pt-5">
        <CommentList props={{ blogid: props.blogid, newComment }} />
      </div>
    </div>
  );
}

export default Comment;
