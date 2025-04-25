
import moment from "moment";
import { getEnv } from "../helpers/getEnv";
import { useFetch } from "../hooks/userFetch";
import { useState } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaFire, FaStar } from "react-icons/fa";
import { decode } from "html-entities";
import { Link } from "react-router-dom";
import { convert } from 'html-to-text';

 function BlogHome() {
  const [limit, setLimit] = useState(4)
  const [sort, setSort] = useState('-createdAt'); 
  const [travelBlog , setTravelBlog] = useState();
  const categoryId  = 'Travel';

  const {data: blogData} = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/featured?limit=${limit}`,{
        method : 'get',
        credentials: 'include'
  })


  const {data: blogDataByCategory} = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/blog/travelcategory/${categoryId}?limit=6&sort=${sort}`,{
    method : 'get',
    credentials: 'include'
})

console.log(blogDataByCategory);

  const featuredPosts = [
    {
      id: 1,
      title: "The Future of Web Development in 2024",
      excerpt: "Explore the latest trends shaping the future of frontend and backend technologies.",
      category: "Technology",
      date: "May 15, 2024",
      readTime: "5 min read",
      image: "featured1.jpeg",
    },
    {
      id: 2,
      title: "Minimalist Design Principles for Modern Websites",
      excerpt: "How less clutter leads to better user engagement and conversions.",
      category: "Design",
      date: "May 10, 2024",
      readTime: "4 min read",
      image: "featured2.jpeg",
    },
    {
        id: 2,
        title: "Minimalist Design Principles for Modern Websites",
        excerpt: "How less clutter leads to better user engagement and conversions.",
        category: "Design",
        date: "May 10, 2024",
        readTime: "4 min read",
        image: "featured3.jpeg",
      },
      {
        id: 2,
        title: "Minimalist Design Principles for Modern Websites",
        excerpt: "How less clutter leads to better user engagement and conversions.",
        category: "Design",
        date: "May 10, 2024",
        readTime: "4 min read",
        image: "featured4.jpeg",
      },

      {
        id: 2,
        title: "Minimalist Design Principles for Modern Websites",
        excerpt: "How less clutter leads to better user engagement and conversions.",
        category: "Design",
        date: "May 10, 2024",
        readTime: "4 min read",
        image: "featured4.jpeg",
      },
  ];

  const trendingPosts = [
    {
      id: 3,
      title: "Why React 19 Will Change State Management Forever",
      excerpt: "Breaking down the new hooks and features coming in React 19.",
      category: "React",
      date: "May 12, 2024",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Tailwind CSS vs. SASS: A 2024 Comparison",
      excerpt: "Which CSS methodology is best for your next project?",
      category: "CSS",
      date: "May 8, 2024",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "Building a Serverless API with Next.js",
      excerpt: "Step-by-step guide to deploying a scalable API.",
      category: "Next.js",
      date: "May 5, 2024",
      readTime: "8 min read",
    },
    {
        id: 5,
        title: "Building a Serverless API with Next.js",
        excerpt: "Step-by-step guide to deploying a scalable API.",
        category: "Next.js",
        date: "May 5, 2024",
        readTime: "8 min read",
      },
      {
        id: 5,
        title: "Building a Serverless API with Next.js",
        excerpt: "Step-by-step guide to deploying a scalable API.",
        category: "Next.js",
        date: "May 5, 2024",
        readTime: "8 min read",
      },
      {
        id: 5,
        title: "Building a Serverless API with Next.js",
        excerpt: "Step-by-step guide to deploying a scalable API.",
        category: "Next.js",
        date: "May 5, 2024",
        readTime: "8 min read",
      },
  ];

    // Pagination state
    const [currentFeaturedPage, setCurrentFeaturedPage] = useState(1);
    const [currentTrendingPage, setCurrentTrendingPage] = useState(1);
    const postsPerPage = 2; // Adjust based on your design
  
    // Pagination logic
    const indexOfLastFeatured = currentFeaturedPage * postsPerPage;
    const indexOfFirstFeatured = indexOfLastFeatured - postsPerPage;
    const currentFeaturedPosts = featuredPosts.slice(indexOfFirstFeatured, indexOfLastFeatured);
  
    const indexOfLastTrending = currentTrendingPage * postsPerPage;
    const indexOfFirstTrending = indexOfLastTrending - postsPerPage;
    const currentTrendingPosts = trendingPosts.slice(indexOfFirstTrending, indexOfLastTrending);

    // Change page
  const paginateFeatured = (pageNumber) => setCurrentFeaturedPage(pageNumber);
  const paginateTrending = (pageNumber) => setCurrentTrendingPage(pageNumber);

  const plainText = (blogcontent) => convert(decode(blogcontent || ""), {
              wordwrap: false, 
              preserveNewlines: false, 
      });

  return (
    <div className="max-w-7xl mx-auto px-4 mt-20 sm:px-6 lg:px-8 ">
      {/* Featured Posts (Full-width cards) */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-12 justify-center mt-8  text-5xl">
          <FaStar className="text-yellow-500" />
          <h2 className="text-3xl font-bold text-gray-900">Featured Posts</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">

          {blogData && blogData.length > 0 ? blogData.map(blog => <div
              key={blog._id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-64 bg-gray-100 overflow-hidden">
              <Link to={`/blog/${blog.category?.slug}/${blog.slug}`}><img
                  src={blog.featuredimage}
                  
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
                
              </div>
              <div className="p-6 bg-white">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full mb-2">
                  {blog.category?.name}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{blog.title}</h3>
                <p className="text-gray-700 text-sm w-full md:w-[26vw]" >{plainText(blog.blogcontent).substring(0, 100).trim() + (plainText.length > 100 ? '...' : '')}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mt-3">
                  <span>{moment(blog?.createdAt).format('DD-MM-YYYY')}</span>
                  
                </div>
                
                <div className="mt-4 md:w-[10vw] w-[35vw]">
                                            <Link to={`/blog/${blog.category?.slug}/${blog.slug}`}><p className="text-white text-sm font-bold bg-blue-600 px-4 py-2 rounded-md"> Read More... </p>
                                           </Link>
                                        </div>

              </div>
            </div>) : <></>}


          
        </div>
                {/* Featured Pagination */}
                {/* <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => paginateFeatured(currentFeaturedPage - 1)}
            disabled={currentFeaturedPage === 1}
            className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
          
          {[...Array(Math.ceil(featuredPosts.length / postsPerPage)).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginateFeatured(number + 1)}
              className={`px-3 py-1 rounded-md ${currentFeaturedPage === number + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              {number + 1}
            </button>
          ))}

          <button
            onClick={() => paginateFeatured(currentFeaturedPage + 1)}
            disabled={currentFeaturedPage === Math.ceil(featuredPosts.length / postsPerPage)}
            className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div> */}
      </section>

      {/* Trending Posts (List with icons) */}
      <section>
      <div className="flex items-center gap-2 mb-8 justify-center mt-28 text-3xl">
      <FaFire className="text-orange-500" />
          <h2 className="text-3xl font-bold text-gray-900">Trending Travel Blogs</h2>
        </div>
        

        <div className="grid gap-6 md:grid-cols-3">
          

          {blogDataByCategory?.blogs && blogDataByCategory?.blogs?.length > 0 ? blogDataByCategory?.blogs?.map(travelblog => <div
              key={travelblog._id}
              className="p-6 border border-gray-400 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all duration-300 bg-slate-500"
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full mb-3">
                {travelblog.category?.name}
              </span>
              <h3 className="text-lg font-bold text-blue-300 mb-2">{travelblog.title}</h3>
              <p className="text-gray-100 text-sm w-full" >{plainText(travelblog.blogcontent).substring(0, 100).trim() + (plainText.length > 100 ? '...' : '')}</p>
              <div className="flex text-md justify-between items-center  text-white mt-3">
                <span className="font-bold">{moment(travelblog?.createdAt).format('DD-MM-YYYY')}</span>
                
              </div>

              <div className="mt-4 w-[35vw] md:w-[10vw]">
                                            <Link to={`/blog/${travelblog.category?.slug}/${travelblog.slug}`}><p className="text-white text-sm font-bold bg-blue-600 px-4 py-2 rounded-md"> Read More... </p>
                                           </Link>
                                        </div>
            </div>) : <></>}

          
        </div>
      </section>
    </div>
  );
}

export default BlogHome