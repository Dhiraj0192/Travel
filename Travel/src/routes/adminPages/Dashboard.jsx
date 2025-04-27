import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { deleteData } from "../../helpers/handleDelete";
import { showToast } from "../../helpers/showToast";
import { useAuth } from "@clerk/clerk-react";
import RecentPendingBlog from "../../components/adminComponents/RecentPendingBlog";

function Dashboard() {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  if (isSignedIn === false) {
    navigate("/admin-login");
  }
  const [isChecked, setIsChecked] = useState(false);
  const [id, setId] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/dashboard/blog-count`,
    {
      method: "get",
      credentials: "include",
    }
  );

  const { data: advertise } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/advertise/advertise`,
    {
      method: "get",
      credentials: "include",
    }
  );

  useEffect(() => {
    if (advertise?.advertise.length > 0) {
      setId(advertise ? advertise?.advertise[0]._id : "");
    }
  }, [advertise]);
  // console.log(advertise?.advertise.length);

  const { data: commentCount } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/dashboard/comment-count`,
    {
      method: "get",
      credentials: "include",
    }
  );

  const { data: userCount } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/dashboard/user-count`,
    {
      method: "get",
      credentials: "include",
    }
  );

  const handleDelete = () => {
    if (advertise?.advertise.length > 0) {
      setId(advertise ? advertise?.advertise[0]._id : "");
      if (id != undefined) {
        const response = deleteData(
          `${getEnv("VITE_API_BASE_URL")}/advertise/delete/${id}`
        );
        if (response) {
          showToast("success", "Advertise deleted");
        } else {
          showToast("error", "Data not deleted.");
        }
      }
    } else {
      return showToast("success", "Advertise Empty");
    }
  };

  useEffect(() => {
    if (isChecked === true) {
      handleDelete();
    }
  }, [isChecked === true]);

  return (
    <div className="w-full flex ">
      {/* Sidebar */}
      <div
        className={`fixed z-50 bg-gray-800 h-screen transition-transform ${
          sidebarOpen ? "translate-x-0 w-[65%]" : "-translate-x-full"
        } lg:translate-x-0 lg:w-[20%]`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-[80%] absolute lg:left-[20%] bg-[url(public/346596-PAQ0SL-281.jpg)] bg-cover bg-no-repeat text-black px-6 py-6">
        {/* Toggle Button for Mobile */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-black text-3xl focus:outline-none"
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>
        <div className="flex flex-col items-start gap-2">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex lg:flex-row flex-col lg:items-center justify-between gap-6 lg:gap-0">
              <div className="flex flex-col items-start gap-2">
                <h1 className="text-3xl font-bold text-black">
                  Welcome to Traveller's Mirror Dashboard
                </h1>
                <p className="text-gray-800 text-lg">
                  Here's an overview of your blog performance
                </p>
              </div>
              {advertise?.advertise.length > 0 ? (
                <Link
                  to={`/admin-advertise/edit/${id}`}
                  className="py-3 font-bold px-8 bg-blue-600 rounded-lg text-white -mr-20 w-[40vw] md:w-[25vw] lg:w-[11vw]"
                >
                  Update Ads
                </Link>
              ) : (
                <></>
              )}

              <div className="flex items-center space-x-2 ">
                <Switch
                  onCheckedChange={setIsChecked}
                  checked={isChecked}
                  id="airplane-mode"
                />
                <Label htmlFor="airplane-mode" className="text-white">
                  On/Off Advertise Mode
                </Label>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 mb-10 w-full gap-8">
            {/* total posts */}

            <div className="rounded-lg bg-gray-800 w-1/2 p-4 flex items-center justify-start gap-4">
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

            <div className="rounded-lg bg-gray-800 w-1/2 p-4 flex items-center justify-start gap-4">
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

          <div className="">
            <h1 className="text-3xl font-bold text-black">
              Approval Pending Blogs
            </h1>
          </div>

          <RecentPendingBlog />

          <BlogAdminDashboard />

          <div className="mt-8">
            <h1 className="text-3xl font-bold text-white">User Management</h1>
          </div>

          <div className="flex items-center justify-between mt-3 mb-10 w-full">
            {/* total posts */}

            <div className="rounded-lg bg-gray-800 w-full p-4 flex items-center justify-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-700 flex justify-center items-center">
                <FaUserSecret className="w-5 h-5 text-green-400" />
              </div>

              <div className="flex flex-col  items-start">
                <p className="text-gray-300 ">Total Users</p>
                <p className="font-semibold text-white text-2xl">
                  {userCount?.totaluser}
                </p>
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
