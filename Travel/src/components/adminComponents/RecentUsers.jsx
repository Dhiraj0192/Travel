import { FiCheck, FiChevronRight, FiEdit2, FiTrash2 } from "react-icons/fi";
import Image from "../Image";
import { useFetch } from "../../hooks/userFetch";
import { getEnv } from "../../helpers/getEnv";
import { deleteData } from "../../helpers/handleDelete";
import { Link } from "react-router-dom";

const RecentUsersTable = () => {
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
      
      showToast("success", "Data deleted");
    } else {
      showToast("error", "Data not deleted.");
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
    <div className="w-full p-6 bg-gray-600 rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold text-white mb-6">Recent Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-400">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                USER
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
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
                      className="px-6 py-4 whitespace-nowrap text-green-500"
                      
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

      <div className="mt-4 flex justify-end">
        <Link to="/admin-users" className="bg-red-400 flex items-center text-sm font-medium text-white hover:text-white px-4 py-2 rounded-lg">
          View All <FiChevronRight className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default RecentUsersTable;
