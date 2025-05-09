import { getEnv } from "../helpers/getEnv.js";
import { useFetch } from "../hooks/userFetch.js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";
import { useDispatch } from "react-redux";
import Image from "./Image.jsx";
import { Avatar, AvatarImage } from "./ui/avatar.jsx";
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from "react-dropzone";
import { setUser } from "../redux/user/user.slice.js";
import { showToast } from "../helpers/showToast.js";

const ProfileManagement = () => {
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();
  const dispath = useDispatch();
  const user = useSelector((state) => state.user);

  const {
    data,
    error,
    loading,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/user/get-user/${user.user._id}`,
    { method: "get", credentials: "include" }
  );

  
  

  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    fullName: `${data.user.name}`,
    email: `${data.user.email}`,
    bio: "Professional blogger with over 5 years of experience writing about technology, travel, and lifestyle topics. Always looking for new stories to tell and experiences to share.",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  async function onSubmit(values) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(values));
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/update-user/${user.user._id}`,
        {
          method: "put",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }

      // dispath(setUser(data.user));

      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    // Add your form submission logic here
    
  };

  const handleFileSlection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };
  // if (loading) return <Loading />;
  return (
    <div className="">
      <Image src="featured1.jpeg" className="w-full h-52 rounded-t-xl" />
      <div className="w-32 h-32 rounded-full border-black border-x-2 border-y-2 ml-10 -mt-14">
        <Dropzone onDrop={(acceptedFiles) => handleFileSlection(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Avatar className="w-32 h-32 relative group">
                <AvatarImage
                  className=""
                  src={filePreview ? filePreview : "featured1.jpeg"}
                />
                <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 justify-center items-center bg-black bg-opacity-20 border-2 border-blue-600 rounded-full group-hover:flex hidden cursor-pointer">
                  <IoCameraOutline color="#7c3aed" />
                </div>
              </Avatar>
            </div>
          )}
        </Dropzone>
      </div>
      <div className="w-full p-6 rounded-lg">
        {/* Profile Header */}

        {/* Profile Form */}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-white mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-white mb-1">
                Email Address
              </label>
              <input
                disabled={true}
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-lg font-medium text-white mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-white mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={profile.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-white mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={profile.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-white mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={profile.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-white hover:bg-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileManagement;
