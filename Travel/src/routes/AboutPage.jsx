import React, { useState } from "react";
import Image from "../components/Image";
import Footer from "../components/Footer";
import { IoIosCall } from "react-icons/io";
import { FaArrowRight, FaUserSecret } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useFetch } from "../hooks/userFetch";
import { getEnv } from "../helpers/getEnv";
import { Link, Navigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaRocketchat } from "react-icons/fa";
import { Input } from "../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Button } from "../components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { GrNotes } from "react-icons/gr";
import UserIcon from "../components/UserIcon";

function AboutPage() {
  const user = useSelector((state) => state.user);
  const [previewImage, setPreviewImage] = useState(null);



  const [sort, setSort] = useState("-createdAt");

  const [query, setQuery] = useState();
  let [searchData, setSearchData] = useState();
  const [refreshData, setRefreshData] = useState(false);

  const {
            data: otherData,
            loading,
            error,
          } = useFetch(`${getEnv("VITE_API_BASE_URL")}/other/details`, {
            method: "get",
            credentials: "include",
          });
      
          

  

  return (
    <div className="flex flex-col min-h-screen">
      {user?.isLoggedIn && <UserIcon/>}
      <div className="w-full ">
        <div className="overflow-hidden bg-gradient-to-b from-[#4b55678b] to-[#1a1c208b] bg-opacity-5 h-[25vh] lg:h-[33vh]">
          <img
            src="https://images.pexels.com/photos/12231824/pexels-photo-12231824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="w-full h-[37vh] lg:h-[54vh] absolute top-0 -z-10 bg-cover "
          />
          {/* breadcrumb */}
          <div className="h-[20vh] flex flex-col justify-center">
            {/* introduction */}
            <div className="lg:px-32 md:px-6 px-6 flex items-center justify-between">
              <div className="lg:mt-40 mt-20 lg:w-[60vw] w-full">
                <h1 className=" text-white text-2xl md:text-5xl lg:text-5xl font-bold">
                  About
                </h1>
                <p className="text-gray-200 text-lg font-semibold font-serif mt-6">
                  More about me and Traveller's Mirror
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:px-32 w-full  mb-10">
          
          <div className="mt-16  flex flex-col">
            <div className="flex items-center gap-1 lg:flex-row flex-col">
                <div className="flex flex-col items-start gap-4 w-full md:px-6 px-6 lg:w-[65vw] text-justify">
                    

                    <div className="flex items-center gap-2">
                    <h1 className="text-black text-xl font-semibold">Traveller's Mirror</h1>
                    <div className="bg-gray-400 w-[15vw] h-[1px] "></div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <p className="text-black font-bold text-2xl">
                        About Traveller's Mirror
                        </p>
                        <p className="text-black font-bold text-xl">
                        🌍 Where Every Journey Finds Its Reflection
                        </p>
                        <p className="text-black text-lg">
                        Welcome to Traveller's Mirror, a sanctuary for wanderers, storytellers, and curious souls. This is more than just a travel blog platform—it’s a global canvas where adventures are immortalized, cultures are celebrated, and connections are forged through the shared love of exploration.
                        </p>

                        <h2 className="text-black font-bold text-2xl">
                        Our Story
                        </h2>

                        <p className="text-black text-lg">

Travel shapes us. It leaves imprints on our hearts, changes our perspectives, and stitches unforgettable memories into the fabric of who we are. But stories lose their magic when kept to ourselves. That’s why we built Traveller's Mirror: a space to reflect your journeys, inspire others, and discover the world through eyes like yours.

                        </p>
                        <p className="text-black text-lg">

                        Whether you’re a solo backpacker scribbling tales from remote villages, a foodie documenting culinary escapades, or a family sharing road-trip diaries, this platform is your digital campfire. Gather around, and let’s swap stories.

                        </p>
                        <h2 className="text-black font-bold text-2xl">
                        What We Offer
                        </h2>
                        <p className="text-black text-xl font-bold">
                        ✨ For Writers
                        </p>
                        <p className="text-black text-lg">

                        Your Story, Your Way: Craft blogs across unlimited categories—Adventure, Culture, Food, Budget Travel, or your unique niche.
                        </p>
                        <p className="text-black text-lg">

                        Seamless Control: Manage drafts, edits, and published posts in a clutter-free dashboard. Delete, update, or relive old memories with one click
                        </p>
                        <p className="text-black text-lg">

                        Rich Creativity: Embed photos, maps, and videos to bring your tales to life.


                        </p>
                        <p className="text-black text-xl font-bold">
                        🌟 For Readers
                        </p>
                        <p className="text-black text-lg">

                        Discover Authenticity: Dive into raw, unfiltered stories from real travelers—no algorithms, no ads, just genuine experiences
                        </p>
                        <p className="text-black text-lg">

                        Engage & Connect: Like, comment, and bookmark posts that resonate with you. Follow your favorite writers and build a community of fellow explorers.
                        </p>
                        <p className="text-black text-lg">

                        
Explore the Globe: Use our interactive map to wander virtually, or filter blogs by region, season, or theme.

                        </p>
                    </div>
                </div>

                <div className="">
                <div className=" flex flex-col md:px-6 lg:px-10 w-full mt-20 mb-10">
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        "https://images.pexels.com/photos/413960/pexels-photo-413960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/450441/pexels-photo-450441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/2577274/pexels-photo-2577274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        
                        "https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/2104742/pexels-photo-2104742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/238622/pexels-photo-238622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/210012/pexels-photo-210012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        
                        "https://images.pexels.com/photos/2114206/pexels-photo-2114206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/356808/pexels-photo-356808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        
                        "https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/160483/hiker-traveler-trip-travel-160483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/531602/pexels-photo-531602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        "https://images.pexels.com/photos/716421/pexels-photo-716421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        
                        
                    ].map((src, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
                            onClick={() => setPreviewImage(src)}
                        >
                            <img
                                src={src}
                                alt={`Gallery Image ${index + 1}`}
                                className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {previewImage && (
            <div
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                onClick={() => setPreviewImage(null)}
            >
                <img
                    src={previewImage}
                    alt="Preview"
                    className="max-w-full max-h-full"
                />
            </div>
        )}
                </div>
            </div>
          </div>

          {/* need help */}
          <div className="w-full lg:w-[80vw] flex md:flex-row flex-col px-6 lg:px-0 items-center gap-6 mt-32 rounded-lg lg:ml-4 bg-gray-100 shadow-md">
            <img
              src="https://images.pexels.com/photos/326576/pexels-photo-326576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="md:w-[40vw] lg:w-[60vh] w-full h-[35vh] md:h-[40vh] lg:h-[50vh] rounded-l-xl"
              alt=""
            />
            <div className="flex-col items-start gap-3">
              <h1 className="text-black text-xl font-bold">Need More Help?</h1>
              <p className="text-gray-600 text-lg">
                If you couldn't find the answer to your question, our customer
                support team is ready to assist you with any inquiries about our
                travel packages.
              </p>

              <div className=" mt-4 flex flex-col gap-3 items-start">
                <div className="flex items-center gap-2">
                  <div className="rounded-full w-10 h-10 items-center bg-blue-400 flex justify-center ">
                    <IoIosCall className="items-center" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-600 text-sm">Call us at</p>
                    <p className="text-black text-lg">{otherData?.number}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="rounded-full w-10 h-10 items-center bg-blue-400 flex justify-center ">
                    <MdEmail className="items-center" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-600 text-sm">Email us at</p>
                    <p className="text-black text-lg">
                    {otherData?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="rounded-full w-10 h-10 items-center bg-blue-400 flex justify-center ">
                    <FaRocketchat className="items-center" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-600 text-sm">Live Chat</p>
                    <p className="text-black text-lg">Available 24/7</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex gap-2 items-center">
                <h2 className="text-blue-600 text-lg font-bold">Contact Us</h2>
                <FaArrowRight className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutPage;
