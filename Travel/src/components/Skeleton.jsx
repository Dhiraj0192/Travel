import React from 'react';

const Skeleton = ({ type }) => {
  if (type === 'popularCategories') {
    return (
      <>
      <div className="lg:px-32 mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 animate-pulse">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="w-full h-60 bg-gray-300 rounded-lg shadow-md"></div>
        ))}
      </div>
      <div className="lg:px-32 mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="w-full h-60 bg-gray-300 rounded-lg shadow-md"></div>
      ))}
    </div></>
    );
  }

  if (type === 'recentBlogs') {
    return (
      <div className="lg:px-32 flex flex-col gap-6 animate-pulse">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="mt-10 flex flex-col md:flex-row gap-4 p-4 bg-gray-300 rounded-lg shadow-md">
            <div className="w-full md:w-1/2 h-64 bg-gray-400 rounded"></div>
            <div className="flex flex-col flex-1 gap-2">
              <div className="w-3/4 h-6 bg-gray-400 rounded"></div>
              <div className="w-full h-4 bg-gray-400 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-400 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <div className="w-full h-6 bg-gray-300 rounded animate-pulse"></div>;
};

export default Skeleton;