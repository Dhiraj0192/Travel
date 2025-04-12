import React from "react";
import { Link } from "react-router-dom";
import Image from "./Image";

function MainCategories() {
  return (
    <div className="lg:px-32 mt-10 mb-10">
      <div className="hidden md:flex bg-gray-300 rounded-3xl xl:rounded-full p-4 shadow-xl items-center justify-center gap-8 mt-10">
        <div className="flex-1 flex items-center justify-between flex-wrap">
          <Link
            to="/posts"
            className="bg-blue-800 text-white rounded-full px-4 py-2"
          >
            All Categories
          </Link>
          <Link
            to="/posts?cat=web-design"
            className="hover:bg-blue-50 rounded-full px-4 py-2"
          >
            Adventure
          </Link>
          <Link
            to="/posts?cat=development"
            className="hover:bg-blue-50 rounded-full px-4 py-2"
          >
            Luxury
          </Link>
          <Link
            to="/posts?cat=databases"
            className="hover:bg-blue-50 rounded-full px-4 py-2"
          >
            Solo Travel
          </Link>
          <Link
            to="/posts?cat=databases"
            className="hover:bg-blue-50 rounded-full px-4 py-2"
          >
            Budget Travel
          </Link>
          <Link
            to="/posts?cat=seo"
            className="hover:bg-blue-50 rounded-full px-4 py-2"
          >
            Marketing
          </Link>
        </div>
        <span className="text-xl font-medium">|</span>

        <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="gray"
          >
            <circle cx="10.5" cy="10.5" r="7.5" />
            <line x1="16.5" y1="16.5" x2="22" y2="22" />
          </svg>
          <input
            type="text"
            placeholder="search a post..."
            className="bg-transparent"
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-6 mt-10 mb-10">
        <div className="flex-col items-center gap-4">
          <Image
            src="featured2.jpeg"
            className="rounded-xl object-cover
                    shadow-2xl  aspect-video"
          />
          <p className="text-black capitalize text-2xl font-semibold text-center mt-3">
            travel blog
          </p>
        </div>

        <div className="flex-col items-center gap-4">
          <Image
            src="featured1.jpeg"
            className="rounded-xl object-cover
                    shadow-2xl  aspect-video"
          />
          <p className="text-black capitalize text-2xl font-semibold text-center mt-3">
            destination blog
          </p>
        </div>

        <div className="flex-col items-center justify-center gap-4">
          <Image
            src="featured2.jpeg"
            className="rounded-xl object-cover
                    shadow-2xl  aspect-video"
          />
          <p className="text-black capitalize text-2xl font-semibold text-center mt-3">
            travel blog
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-6">
        <div className="flex-col items-center gap-4">
          <Image
            src="featured2.jpeg"
            className="rounded-xl object-cover
                    shadow-2xl  aspect-video"
          />
          <p className="text-black capitalize text-2xl font-semibold text-center mt-3">
            travel blog
          </p>
        </div>

        <div className="flex-col items-center gap-4">
          <Image
            src="featured1.jpeg"
            className="rounded-xl object-cover
                    shadow-2xl  aspect-video"
          />
          <p className="text-black capitalize text-2xl font-semibold text-center mt-3">
            destination blog
          </p>
        </div>

        <div className="flex-col items-center justify-center gap-4">
          <Image
            src="featured2.jpeg"
            className="rounded-xl object-cover
                    shadow-2xl  aspect-video"
          />
          <p className="text-black capitalize text-2xl font-semibold text-center mt-3">
            travel blog
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainCategories;
