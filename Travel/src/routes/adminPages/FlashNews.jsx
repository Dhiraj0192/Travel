import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiFilter,
  FiChevronDown,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
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
import { Link, Navigate, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { deleteData } from "../../helpers/handleDelete";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function FlashNews() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user);
  // console.log(user);
  

  // Protect the /single page route
  if (!user.isAdminLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  


  const [refreshData, setRefreshData] = useState(false);
  let { data: blogData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-all-flah-news`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  
  const StatusBadge = ({ status }) => {
    const statusClasses = {
      published: "bg-green-100 text-green-800",

      pending: "bg-blue-100 text-blue-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}
      >
        {status}
      </span>
    );
  };

  const handleDelete = (id) => {
    const respnse = deleteData(
      `${getEnv("VITE_API_BASE_URL")}/blog/delete/${id}`
    );
    if (respnse) {
      setRefreshData(!refreshData);
      toast("Data deleted", {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: false,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                          
                          });
      
    } else {
      toast("Data not deleted", {
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
  };
  

  

  return (
    <div className="w-full flex">
      {/* Sidebar */}
      <div
        className={`fixed z-50 bg-white h-screen transition-transform ${
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
          <div>
            <h1 className="text-2xl font-semibold text-black">
              Manage Flash News Blogs
            </h1>
          </div>

          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <FiPlus />
            <Link to="/admin-add-blog">New Post</Link>
          </button>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg shadow-sm">
          

          <div className="py-10 w-full bg-gray-800 rounded-lg shadow-sm">
            <div className="overflow-x-auto">
              <table className="rounded-lg min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-500 rounded-lg">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                      Status
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-gray-200">
                  { blogData && blogData?.blog?.length > 0
                    && blogData.blog.map((blog) => (
                        <tr key={blog.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-50">
                              {blog.author}
                            </div>
                          </td>
                          <Link to={`/adminblog/${blog.subcategory.slug}/${blog.slug}`}>
                  <td className="px-6 py-4 whitespace-nowrap ">
                    <div className="text-sm font-medium text-gray-50 hover:text-black">
                      {blog.title.substring(0, 25)}....
                    </div>
                  </td>
                  </Link>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-50">
                              {blog.subcategory.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={blog.status} />
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-50">
                              {moment(blog?.createdAt).format("DD-MM-YYYY")}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <button className="text-green-500 hover:text-white">
                                <Link to={`/admin-blog/edit/${blog._id}`}>
                                  <FiEdit2 className="h-5 w-5" />
                                </Link>
                              </button>
                              <button
                                onClick={() => handleDelete(blog._id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <FiTrash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlashNews;
