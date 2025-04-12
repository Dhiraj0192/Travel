import { FiCheck, FiChevronRight, FiUser, FiEdit, FiClock, FiMapPin, FiMonitor } from "react-icons/fi";

const UserManagementDashboard = () => {
  // Sample data
  const recentUsers = [
    { name: "Alex Johnson", email: "alex.johnson@example.com" },
    { name: "Michael Roberts", email: "michael.roberts@example.com" },
    { name: "Sarah Williams", email: "sarah.williams@example.com" },
    { name: "David Thompson", email: "david.thompson@example.com" },
  ];

  const userRoles = [
    { rule: "Administrator", status: "Active", registered: "Jan 12, 2023" },
    { rule: "Editor", status: "Active", registered: "Feb 05, 2023" },
    { rule: "Author", status: "Pending", registered: "Mar 18, 2023" },
    { rule: "Subscriber", status: "Inactive", registered: "Apr 02, 2023" },
  ];

  const userActivity = [
    {
      user: "Alex Johnson",
      time: "10 minutes ago",
      action: "Logged in from Chicago, IL using Chrome on Windows",
      icon: <FiMapPin className="text-blue-500" />,
    },
    {
      user: "Michael Roberts",
      time: "45 minutes ago",
      action: 'Published a new blog post "10 Tips for Better Blog Writing"',
      icon: <FiEdit className="text-green-500" />,
    },
    {
      user: "Sarah Williams",
      time: "2 hours ago",
      action: "Updated profile information and changed profile picture",
      icon: <FiUser className="text-purple-500" />,
    },
  ];

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
    <div className="p-6 w-full bg-white rounded-lg shadow-sm space-y-8">
      {/* Recent Users Section */}
      <section>
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">User Management</h1>
        <h2 className="text-xl font-medium text-gray-700 mb-4">Recent Users</h2>
        
        <div className="space-y-4 mb-6">
          {recentUsers.map((user, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FiUser className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-800">Active Users</p>
            <p className="text-2xl font-semibold text-blue-600">2,125</p>
          </div>
        </div>
        
        <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
          View All <FiChevronRight className="ml-1" />
        </button>
      </section>

      {/* User Roles Section */}
      <section>
        <h2 className="text-xl font-medium text-gray-700 mb-4">User Roles</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RULE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">REGISTERED</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTION</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userRoles.map((role, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.rule}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={role.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{role.registered}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <FiCheck className="text-green-500 h-5 w-5" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* User Activity Section */}
      <section>
        <h2 className="text-xl font-medium text-gray-700 mb-4">User Activity</h2>
        <div className="space-y-6">
          {userActivity.map((activity, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-800">{activity.user}</p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <FiClock className="mr-1" /> {activity.time}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{activity.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="mt-4 flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
          View all activity <FiChevronRight className="ml-1" />
        </button>
      </section>
    </div>
  );
};

export default UserManagementDashboard;