import { FiChevronRight, FiBarChart2, FiMessageSquare, FiShare2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const TopPostsDashboard = () => {
  // Sample data
  const topPosts = [
    {
      title: "10 Writing Tips Every Blogger Should Know",
      date: "Published on Mar 15, 2023",
      engagement: "12%",
      comments: 86,
      shares: 124,
    },
    {
      title: "How to Improve Your Blog's SEO in 2023",
      date: "Published on Mar 10, 2023",
      engagement: "8%",
      comments: 65,
      shares: 96,
    },
    {
      title: "The Ultimate Guide to Content Marketing",
      date: "Published on Mar 5, 2023",
      engagement: "3%",
      comments: 42,
      shares: 78,
    },
  ];

  const mostViewed = [
    {
      title: "The Ultimate Guide to Content Marketing",
      views: "4,192",
    },
    {
      title: "7 Ways to Monetize Your Blog in 2023",
      views: "3,845",
    },
    {
      title: "How to Build an Email List in 2023",
      views: "3,128",
      date: "Published on Mar 1, 2023",
      engagement: "5%",
      comments: 38,
      shares: 62,
    },
  ];

  return (
    <div className="mt-6 w-full p-6 bg-gray-600 rounded-lg shadow-sm space-y-8">
      {/* Top Posts Section */}
      <section>
        <h1 className="text-2xl font-semibold text-white mb-6">Top Posts</h1>
        
        <div className="space-y-6">
          {topPosts.map((post, index) => (
            <div key={index} className="pb-6 border-b border-gray-200 last:border-0 last:pb-0">
              <h2 className="text-xl font-medium text-white mb-2">{post.title}</h2>
              <p className="text-sm text-gray-300 mb-3">{post.date}</p>
              
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center text-green-600 font-bold text-lg">
                  <FiBarChart2 className="mr-1 font-bold" /> <Link to="#">Read More... </Link>
                </span>
                <span className="flex items-center text-gray-600">
                  <FiMessageSquare className="mr-1" /> {post.comments} Comments
                </span>
                <span className="flex items-center text-gray-600">
                  <FiShare2 className="mr-1" /> {post.shares} Shares
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* <button className="mt-4 flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
          View All <FiChevronRight className="ml-1" />
        </button> */}
      </section>

      {/* Most Viewed Posts Section */}
      <section>
        <h2 className="text-xl font-medium text-white mb-4 text-right">Most Viewed Posts</h2>
        
        <div className="space-y-4 mb-6">
          {mostViewed.map((post, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800">{post.title}</h3>
                  {post.date && (
                    <>
                      <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                      <div className="flex items-center space-x-3 text-sm mt-2">
                        <span className="flex items-center text-green-600">
                          <FiBarChart2 className="mr-1" /> {post.engagement}
                        </span>
                        <span className="flex items-center text-gray-600">
                          <FiMessageSquare className="mr-1" /> {post.comments} Comments
                        </span>
                        <span className="flex items-center text-gray-600">
                          <FiShare2 className="mr-1" /> {post.shares} Shares
                        </span>
                      </div>
                    </>
                  )}
                </div>
                <p className="text-lg font-semibold text-blue-600">{post.views} Views</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TopPostsDashboard;