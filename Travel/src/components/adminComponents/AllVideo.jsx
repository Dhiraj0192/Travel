import { FiEdit2, FiTrash2, FiChevronRight } from "react-icons/fi";
import Loading from "../Loading";
import { showToast } from "../../helpers/showToast";
import { getEnv } from "../../helpers/getEnv";
import { deleteData } from "../../helpers/handleDelete";
import { useState } from "react";
import { useFetch } from "../../hooks/userFetch";
import { Link } from "react-router-dom";
import moment from "moment/moment";

const AllVideos = ({ searchData,bData }) => {

    console.log(bData);
    
  // Status badge component
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
      `${getEnv("VITE_API_BASE_URL")}/video/delete/${id}`
    );
    if (respnse) {
      setRefreshData(!refreshData);
      showToast("success", "Data deleted");
    } else {
      showToast("error", "Data not deleted.");
    }
  };
  

  
  return (
    <div className="py-10 w-full bg-gray-600 rounded-lg shadow-sm">
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
                Video Link
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
            {searchData ? searchData.map(video =>
            <tr key={video.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-50">
                {video.author}
              </div>
            </td>
            <Link >
            <td className="px-6 py-4 whitespace-nowrap ">
              <div className="text-sm font-medium text-gray-50 hover:text-black">
                {video.title.substring(0, 25)}....
              </div>
            </td>
            </Link>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-50">
                {video.videolink}
              </div>
            </td>
            

            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-50">
                {moment(video?.createdAt).format("DD-MM-YYYY")}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex space-x-2">
                <button className="text-green-500 hover:text-white">
                  <Link >
                    <FiEdit2 className="h-5 w-5" />
                  </Link>
                </button>
                <button
                  onClick={() => handleDelete(video._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FiTrash2 className="h-5 w-5" />
                </button>
              </div>
            </td>
          </tr> ) :
            
            bData && bData?.video?.length > 0 ? (
              bData.video.map((video) => (
               <tr key={video.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-50">
                      {video.author}
                    </div>
                  </td>
                  <Link >
                  <td className="px-6 py-4 whitespace-nowrap ">
                    <div className="text-sm font-medium text-gray-50 hover:text-black">
                      {video.title.substring(0, 25)}....
                    </div>
                  </td>
                  </Link>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-50">
                      {video.videolink}
                    </div>
                  </td>
                  

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-50">
                      {moment(video?.createdAt).format("DD-MM-YYYY")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-green-500 hover:text-white">
                        <Link >
                          <FiEdit2 className="h-5 w-5" />
                        </Link>
                      </button>
                      <button
                        onClick={() => handleDelete(video._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : 
              <></>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllVideos;
