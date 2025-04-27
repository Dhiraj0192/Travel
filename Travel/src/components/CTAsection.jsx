import React from 'react';
import { FaPen, FaPaperPlane } from 'react-icons/fa';
import { MdOutlineTravelExplore } from 'react-icons/md';

const CTASection = () => {
  const ctaItems = [
    {
      icon: <FaPen className="text-2xl" />,
      title: "Guest Blogging",
      description: "Share your travel experiences with our community",
      buttonText: "Submit",
      url: "/login",
      color: "text-white",
      
      buttonColor: "bg-blue-500"
    },
    {
      icon: <MdOutlineTravelExplore className="text-2xl" />,
      title: "Travel Experiences",
      description: "Book unique adventures with local experts",
      buttonText: "Explore",
      url: "/login",
    //   color: "bg-blue-100",
      buttonColor: "bg-blue-600"
    },
    {
      icon: <FaPaperPlane className="text-2xl" />,
      title: "Contact Us",
      description: "Get travel tips and offers straight to your inbox",
      buttonText: "Contact",
      url: "/contact",
    //   color: "bg-orange-100",
      buttonColor: "bg-blue-800"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">

<div className="flex items-start justify-start mb-14 -mt-10">
        
        </div>
      <div className="max-w-7xl mx-auto">

        
      
            <div className="mb-10 flex flex-col items-center justify-start gap-4">
            <h1 className="text-2xl md:text-4xl font-bold">Still Have Questions?
            </h1>
            <p className="text-gray-600 text-lg text-center">
            Our support team is here to help you get started and succeed with your blog.
            </p>
                
            </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-gray-800 text-white rounded-2xl">
            
          {ctaItems.map((item, index) => (
            <div 
              key={index}
              className={`${item.color} p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2`}
            >
              <div className="flex flex-col text-center items-center md:items-start space-y-4">
                <div className="p-4 rounded-lg shadow-sm border-r-2">
                  {item.icon}
                </div>
                <h3 className="text-xl md:text-xl font-bold text-white">{item.title}</h3>
                <p className="md:hidden lg:block text-gray-200">{item.description}</p>
                <a
                  href={item.url}
                  className={`${item.buttonColor} text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2`}
                >
                  {item.buttonText}
                  <span className="text-lg">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;