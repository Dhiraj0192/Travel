import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiX,
  FiAlertTriangle,
  FiTrash2,
} from "react-icons/fi";
import Sidebar from "../../components/adminComponents/Sidebar";
import { useFetch } from "../../hooks/userFetch";
import { getEnv } from "../../helpers/getEnv";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { deleteData } from "../../helpers/handleDelete";
import { showToast } from "../../helpers/showToast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const Messages = () => {
  const navigate = useNavigate()
  const { isSignedIn } = useAuth();
  if (isSignedIn === false) {

    navigate('/admin-login');
    
  }
  const [refreshData, setRefreshData] = useState(false);
  const [query, setQuery] = useState();
  let [searchComment , setSearchComment] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  let {
      data: contactData,
      loading,
      error,
    } = useFetch(
      `${getEnv("VITE_API_BASE_URL")}/contact/messages`,
      {
        method: "get",
        credentials: "include",
      }
      ,[refreshData]
    );
    console.log(contactData);
    

    // useEffect(()=>{
    //   if (commentData) {
    //     setSearchComment(undefined)
    //   }
    // },[commentData])

    

    const handleDelete = (id) => {
      const respnse = deleteData(
        `${getEnv("VITE_API_BASE_URL")}/contact/delete/${id}`
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


  // // Status badge component
  // const StatusBadge = ({ status }) => {
  //   const statusClasses = {
  //     Approved: "bg-green-100 text-green-800",
  //     Pending: "bg-yellow-100 text-yellow-800",
  //     Spam: "bg-red-100 text-red-800",
  //   };

  //   return (
  //     <span
  //       className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}
  //     >
  //       {status}
  //     </span>
  //   );
  // };

  // search
    
    //   const getInput = (e) => {
    //     setQuery(e.target.value);
    //   };
    
    //   const handleSubmit = async (e) => {
    //     e.preventDefault();
        
    
    //     const response = await fetch(
    //       `${getEnv("VITE_API_BASE_URL")}/comment/search/${query}`,
    //       {
    //         method: "get",
    //         credentials: "include",
    //       }
    //     );
    
    //     const data = await response.json();
        
        
    //     if (data?.comment) {
          
          
    //       setSearchComment(data?.comment);
          
          
    //       commentData = [];
    //     }
        
    //   };

  return (
    <div className="w-full flex">
       <div
        className={`fixed z-50 bg-gray-800 h-screen transition-transform ${
          sidebarOpen ? "translate-x-0 w-[65%]" : "-translate-x-full"
        } lg:translate-x-0 lg:w-[20%]`}
      >
        <Sidebar />
      </div>

      <div className="w-full lg:w-[80%] absolute lg:left-[20%] bg-gray-900 px-6 py-6 min-h-screen">
        {/* Toggle Button for Mobile */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white text-3xl focus:outline-none"
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-white">Contact Messages</h1>
          <p className="text-gray-300 mt-3">
            Organize contact messages with recent activities
          </p>
        </div>
        <div className="w-full pt-6 space-y-8">
          {/* Comments Table Section */}
          <div className="bg-gray-600 rounded-lg shadow-sm p-6">
            

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-500">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                      Date
                    </th>
                    
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                Actions
              </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">STATUS</th> */}
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-gray-200">
                {
                  
                  contactData && contactData?.contacts.map((message) => (
                    <tr key={message._id}>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-50">
                          {message?.name}
                        </div>
                        
                      </td>
                      <td className="px-6 py-4">
                        
                        <div className="text-sm text-green-500">
                          {message?.email}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 text-sm text-gray-50">
                        {message?.message}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-50">
                        {moment(message?.createdAt).format('DD-MM-YYYY')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      
                      <button
                        onClick={() => handleDelete(message?._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                      {/* <td className="px-6 py-4">
                    <StatusBadge status={comment.status} />
                  </td> */}
                    </tr>
                  )) }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
