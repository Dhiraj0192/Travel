import React, { useEffect, useState } from "react";
import { FiSearch, FiPlus, FiFilter, FiChevronDown, FiEdit2, FiTrash2 } from "react-icons/fi";
import Sidebar from "../../components/adminComponents/Sidebar";

import { showToast } from "../..//helpers/showToast";

import { getEnv } from "../../helpers/getEnv";

import { useFetch } from "../../hooks/userFetch";

import { Link, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { deleteData } from "../../helpers/handleDelete";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";

function Packages() {
  const navigate = useNavigate()
  const { isSignedIn } = useAuth();
  if (isSignedIn === false) {

    navigate('/admin-login');
    
  }
  
  const [query, setQuery] = useState();
    let [searchData , setSearchData] = useState();
    const [refreshData, setRefreshData] = useState(false);

  const {
    data: packageData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/package/all-package`, {
    method: "get",
    credentials: "include",
  },[refreshData]);

  // search
  
    const getInput = (e) => {
      setQuery(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(query);
  
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/package/search/${query}`,
        {
          method: "get",
          credentials: "include",
        }
      );
  
      const data = await response.json();
      if (data?.packag.length > 0) {
        setSearchData(data?.packag)
      }
      
    };

     const handleDelete = (id) => {
        const respnse = deleteData(
          `${getEnv("VITE_API_BASE_URL")}/package/delete/${id}`
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
      <div className="w-[20%] h-screen fixed">
        <Sidebar />
      </div>

      <div className="w-[80%] absolute left-[20%] bg-gray-900 px-6 py-6 min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white">Manage Packages</h1>
            <p className="text-gray-300 mt-3">
              Create, edit, and manage your packages...
            </p>
          </div>

          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <FiPlus />
            <Link to="/admin-add-package">New Package</Link>
          </button>
        </div>

        <div className="p-6 bg-gray-600 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 ">
            {/* Search Input */}
            <div className="relative flex-1 bg-gray-500">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-green-400" />
              </div>
              <form onSubmit={handleSubmit}>
              <input
              name="q"
              onInput={getInput}
                type="text"
                placeholder="Search posts..."
                className=" pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              </form>
            </div>

            {/* Filter Button
      <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 bg-green-400">
        <FiFilter /> Filter
      </button> */}

            
          </div>
{/* 
          <AllPost selectedCategoryBlogs={selectedCategoryBlogs} searchData={searchData}/> */}

          <div className="py-10 w-full bg-gray-600 rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                  <table className="rounded-lg min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-500 rounded-lg">
                      <tr>
                        
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                          Package Url
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
                      {searchData ? searchData.map(packag =><tr key={packag.id}>
                            
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-50">
                                {packag.title}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-50">
                                {packag.price}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300 text-sm">
                            {packag.packageurl}
                            </td>
          
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-50">
                                {moment(packag?.createdAt).format("DD-MM-YYYY")}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex space-x-2">
                                <button className="text-green-500 hover:text-white">
                                  <Link to={`/admin-package/edit/${packag._id}`}>
                                    <FiEdit2 className="h-5 w-5" />
                                  </Link>
                                </button>
                                <button
                                  onClick={() => handleDelete(packag._id)}
                                  className="text-red-500 hover:text-red-600"
                                >
                                  <FiTrash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr> ) :
                      
                      packageData && packageData?.packag?.length > 0 && (
                        packageData.packag.map((packag) => (
                            <tr key={packag.id}>
                            
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-50">
                                {packag.title}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-50">
                                {packag.price}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300 text-sm">
                            {packag.packageurl}
                            </td>
          
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-50">
                                {moment(packag?.createdAt).format("DD-MM-YYYY")}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex space-x-2">
                                <button className="text-green-500 hover:text-white">
                                  <Link to={`/admin-package/edit/${packag._id}`}>
                                    <FiEdit2 className="h-5 w-5" />
                                  </Link>
                                </button>
                                <button
                                  onClick={() => handleDelete(packag._id)}
                                  className="text-red-500 hover:text-red-600"
                                >
                                  <FiTrash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) }
                    </tbody>
                  </table>
                </div>
              </div>
        </div>
      </div>
    </div>
  );
}

export default Packages;
