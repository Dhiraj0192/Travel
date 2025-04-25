import React, { useState } from "react";
import Sidebar from "../../components/adminComponents/Sidebar";

import { FaUserSecret } from "react-icons/fa";

import { useFetch } from "../../hooks/userFetch";
import { getEnv } from "../../helpers/getEnv";
import { FiTrash2 } from "react-icons/fi";
import { showToast } from "../../helpers/showToast";
import { deleteData } from "../../helpers/handleDelete";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";

function Users() {
  const navigate = useNavigate()
  const { isSignedIn } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  if (isSignedIn === false) {

    navigate('/admin-login');
    
  }


  const { data :userCount } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/dashboard/user-count`,
    {
      method: "get",
      credentials: "include",
    }
  );

    const { data: allUser } = useFetch(
      `${getEnv("VITE_API_BASE_URL")}/dashboard/get-all-user`,
      {
        method: "get",
        credentials: "include",
      }
    );
  
    const handleDelete = (id) => {
      const respnse = deleteData(
        `${getEnv("VITE_API_BASE_URL")}/dashboard/delete/${id}`
      );
      if (respnse) {
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
  
    // Status badge component
    const StatusBadge = ({ status }) => {
      const statusClasses = {
        Active: "bg-green-100 text-green-800",
        Pending: "bg-yellow-100 text-yellow-800",
        Inactive: "bg-gray-100 text-gray-800",
      };
  
      return (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}
        >
          {status}
        </span>
      );
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

      <div className="w-full lg:w-[80%] absolute lg:left-[20%] bg-gray-900 px-6 py-6 h-screen">
        {/* Toggle Button for Mobile */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white text-3xl focus:outline-none"
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>
        <div className="flex flex-col items-start gap-2">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-white">
              Welcome to Traveller's Mirror Dashboard
            </h1>
            <p className="text-gray-300 text-lg">
              Here's an overview of your Users
            </p>
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

          <div className="w-full p-6 bg-gray-600 rounded-lg shadow-sm">
               
          
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-400">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                          USER
                        </th>
                        <th className="px-16 lg:px-8 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                          EMAIL
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                          ROLE
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                          STATUS
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                          BIO
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                          ACTION
                        </th>
                      </tr>
                    </thead>
                    <tbody className=" divide-y divide-gray-200">
                      {allUser &&
                        allUser?.user.map((user, index) => (
                          <>
                            <tr key={user._id}>
                              <div className="flex items-center justify-start gap-4 py-3">
                                <img
                                  src={user.avatar}
                                  className="w-10 h-10 rounded-full"
                                />
                                <div className="flex flex-col items-start">
                                  <td className=" whitespace-nowrap font-medium text-white">
                                    {user.name}
                                  </td>
                                </div>
                              </div>
                              <td
                                className="px-16 lg:px-8 py-4 whitespace-nowrap text-green-500"
                                
                              >
                                {user.email}
                              </td>
          
                              <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                {user.role}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <StatusBadge status="Active" />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                                {user.bio}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleDelete(user._id)}
                                    className="text-red-500 hover:text-red-600"
                                  >
                                    <FiTrash2 className="h-5 w-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </>
                        ))}
                    </tbody>
                  </table>
                </div>
          
                
              </div>

          
        </div>
      </div>
    </div>
  );
}

export default Users;
