import { GlobeAltIcon, ChartBarIcon, HeartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Partners = () => {
  const partners = [
    {
      name: 'Mount Face Nepal',
      logo: 'https://www.mountfacenepal.com/wp-content/uploads/2023/11/mount-face-nepal-logo-e1700306774600.png',
      description: 'The Best Adventure Destination Planner ',
    },
    
  ];

  return (
    <div className=" py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          
          <div className="flex items-center justify-between backdrop-blur-md">
            <div className="w-[23vw] md:w-[30vw] h-1 bg-gray-300"></div>
            <span className="relative inline-block">
              <HeartIcon className="h-8 w-8 text-red-500 absolute -top-4 -right-8 transform rotate-12" />
              
            </span>
            <h1 className="text-2xl lg:text-3xl font-bold text-black">
            Our Partners
            </h1>
            <div className="w-[23vw] md:w-[30vw] h-1 bg-gray-300"></div>
        </div>
          <p className="mt-4 text-lg text-gray-800">
            Collaborating with industry leaders to deliver exceptional results
          </p>
        </div>

        <div className="flex items-center justify-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-blue-100 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex flex-col items-center">
                <img
                  className="h-[10vw] w-[25vw] object-contain bg-transparent"
                  src="/mount.png"
                  alt={partner.name}
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {partner.name}
                </h3>
                <p className="text-gray-800 text-center mb-4">
                  {partner.description}
                </p>
                <div className="flex space-x-4">
                  <Link to="https://www.mountfacenepal.com/" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
                    <GlobeAltIcon className="h-5 w-5 mr-2" />
                    Website
                  </Link>
                  
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 inline-flex items-center">
            <span className="mr-2">Join our network of partners</span>
            <svg
              className="w-4 h-4 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Partners;