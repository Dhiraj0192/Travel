import React from "react";
import Image from "./Image";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function ReadyBlog() {
  return (
    <div className="mt-8 mb-10">
      <div className="w-[82vw] h-2 bg-white rounded-3xl mb-10 shadow-blue-600 shadow-md"></div>
      <div className="flex items-center justify-between gap-6">
        <Image
          src="featured1.jpeg"
          className="rounded-3xl object-cover w-1/2"
        />
        <div className="flex flex-col gap-7  justify-start">
          <h1 className="text-2xl font-bold text-blue-800">
            Ready to Start Your Blogging Journey?
          </h1>
          <p className="text-black">
            Join thousands of writers who've found their voice online. Create,
            connect, and grow with our powerful blogging platform.
          </p>

          <div className="flex items-center ">
            <FaCheckCircle className="w-4 h-4" />
            <p className="ml-5 text-black">One-click sign-in with Google</p>
          </div>
          <div className="flex items-center">
            <FaCheckCircle className="w-4 h-4" />
            <p className="ml-5 text-black">One-click sign-in with Google</p>
          </div>
          <div className="flex items-center">
            <FaCheckCircle className="w-4 h-4" />
            <p className="ml-5 text-black">One-click sign-in with Google</p>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/">
              <button className="py-2 px-10 rounded-3xl bg-blue-800 border-y-black border-y-2 text-white">
                Login 👋
              </button>
            </Link>
            <Link to="/">
              <button className="py-2 px-8 rounded-3xl bg-transparent border-y-black border-y-2 text-black">
                Learn More
              </button>
            </Link>
          </div>
          <p className="ml-5 text-black">
            No credit card required. Free plan available.
          </p>
        </div>
      </div>

      {/* join community */}

      <div className="mt-16 w-full rounded-3xl p-8 bg-gray-200 flex items-center justify-between gap-4">
        <div className="flex flex-col justify-start gap-4">
          <h1 className="text-3xl font-bold text-blue-800">
            Join Our Writing Community
          </h1>
          <p className="text-black">
            Connect with other bloggers, share ideas, and get inspired. Our
            community helps you grow as a writer.
          </p>
          <div className="flex items-center">
            <FaCheckCircle className="w-4 h-4" />
            <p className="ml-5 text-black">Weekly writing prompts</p>
          </div>
          <div className="flex items-center">
            <FaCheckCircle className="w-4 h-4" />
            <p className="ml-5 text-black">Feedback from experienced writers</p>
          </div>
          <div className="flex items-center">
            <FaCheckCircle className="w-4 h-4" />
            <p className="ml-5 text-black">Networking opportunities</p>
          </div>
        </div>

        <div className="flex flex-col bg-gray-300 rounded-3xl p-6 gap-4 shadow-blue-300 shadow-lg">
            <p className="text-black">+2,500 members</p>
            <p className="text-gray-600">"Joining this community transformed my writing and helped me find my audience. Now I'm a full-time blogger!"</p>
            <div className="flex items-center justify-start gap-2">
                <div className="rounded-full w-10 h-10 bg-blue-700"></div>
                <div className="flex flex-col justify-start">
                    <p className="text-black font-bold">Dhiraj Yadav</p>
                    <p className="text-gray-600">Main Developer</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ReadyBlog;
