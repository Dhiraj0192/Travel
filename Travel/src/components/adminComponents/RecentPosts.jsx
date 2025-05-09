import { FiEdit2, FiTrash2, FiChevronRight } from "react-icons/fi";
import { useFetch } from "../../hooks/userFetch";
import { getEnv } from "../../helpers/getEnv";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { useState } from "react";
import { deleteData } from "../../helpers/handleDelete";

const BlogAdminDashboard = () => {
  const limit = 10;
  const [refreshDataPost, setRefreshDataPost] = useState(false)
  const { data: allBlogs } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/dashboard/get-all?limit${limit}`,
    {
      method: "get",
      credentials: "include",
    },[refreshDataPost]
  );

  const handleDelete = (id) => {
    const respnse = deleteData(
      `${getEnv("VITE_API_BASE_URL")}/blog/delete/${id}`
    );
    if (respnse) {
      setRefreshDataPost(!refreshDataPost);
      showToast("success", "Data deleted");
    } else {
      showToast("error", "Data not deleted.");
    }
  };

  

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

  return (
    <div className="p-6 w-full bg-gray-800 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-white">Recent Blogs</h2>
        <div className="flex justify-end">
          <Link
            to="/admin-posts"
            className="flex items-center text-sm font-medium text-blue-300 hover:text-blue-800"
          >
            View All <FiChevronRight className="ml-1" />
          </Link>
        </div>
      </div>

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
            {allBlogs &&
              allBlogs?.blog.map((blog) => (
                <tr key={blog.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-50">{blog.author}</div>
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
                      {moment(blog.createdAt).format("DD-MM-YYYY")}
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
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogAdminDashboard;
