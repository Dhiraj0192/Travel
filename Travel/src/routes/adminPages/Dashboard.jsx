import React from "react";
import Sidebar from "../../components/adminComponents/Sidebar";

import { BsFileEarmarkPostFill } from "react-icons/bs";
import { MdMessage } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";
import BlogAdminDashboard from "../../components/adminComponents/RecentPosts";
import UserManagementDashboard from "../../components/adminComponents/UserManagement";

import { TiTick } from "react-icons/ti";
import { MdOutlineDisabledByDefault } from "react-icons/md";
import TopPostsDashboard from "../../components/adminComponents/TopPost";
import RecentUsersTable from "../../components/adminComponents/RecentUsers";
import { useFetch } from "../../hooks/userFetch";
import { getEnv } from "../../helpers/getEnv";

function Dashboard() {
  const { data } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/dashboard/blog-count`,
    {
      method: "get",
      credentials: "include",
    }
  );

  const { data: commentCount } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/dashboard/comment-count`,
    {
      method: "get",
      credentials: "include",
    }
  );

  const { data :userCount } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/dashboard/user-count`,
    {
      method: "get",
      credentials: "include",
    }
  );


  


  

  return (
    <div className="w-full flex">
      <div className="w-[20%] h-screen fixed">
        <Sidebar />
      </div>

      <div className="w-[80%] absolute left-[20%] bg-gray-900 px-6 py-6">
        <div className="flex flex-col items-start gap-2">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-white">
              Welcome to Traveller's Mirror Dashboard
            </h1>
            <p className="text-gray-300 text-lg">
              Here's an overview of your blog performance
            </p>
          </div>

          <div className="flex items-center justify-between mt-3 mb-10 w-full gap-8">
            {/* total posts */}

            <div className="rounded-lg bg-gray-600 w-1/2 p-4 flex items-center justify-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-700 flex justify-center items-center">
                <BsFileEarmarkPostFill className="w-5 h-5 text-green-400" />
              </div>

              <div className="flex flex-col  items-start">
                <p className="text-gray-300 ">Total Blogs</p>
                <p className="font-semibold text-white text-2xl">
                  {data?.totalBlog}
                </p>
              </div>
            </div>

            {/* total comments */}

            <div className="rounded-lg bg-gray-600 w-1/2 p-4 flex items-center justify-start gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-700 flex justify-center items-center">
                <MdMessage className="w-5 h-5 text-purple-400" />
              </div>

              <div className="flex flex-col  items-start">
                <p className="text-gray-300 ">Total Comments</p>
                <p className="font-semibold text-white text-2xl">
                  {commentCount?.totalComment}
                </p>
              </div>
            </div>

            
            
          </div>

          <BlogAdminDashboard />

          <div className="mt-8">
            <h1 className="text-3xl font-bold text-white">User Management</h1>
          </div>

          <div className="flex items-center justify-between mt-3 mb-10 w-full">
            {/* total posts */}

            <div className="rounded-lg bg-gray-600 w-full p-4 flex items-center justify-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-700 flex justify-center items-center">
                <FaUserSecret className="w-5 h-5 text-green-400" />
              </div>

              <div className="flex flex-col  items-start">
                <p className="text-gray-300 ">Total Users</p>
                <p className="font-semibold text-white text-2xl">{userCount?.totaluser}</p>
              </div>
            </div>

            
          </div>

          <RecentUsersTable />

          {/* <TopPostsDashboard /> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
