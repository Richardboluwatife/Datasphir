// Make sure you are passing fileInputRef correctly from parent component
import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";

function Settings({ fileInputRef }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    username: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          "https://rent-management-service.onrender.com/auth/users/me/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch profile data");

        const userProfile = await response.json();
        setProfileData({
          firstName: userProfile.first_name || "",
          middleName: userProfile.middle_name || "",
          lastName: userProfile.last_name || "",
          email: userProfile.email || "",
          phoneNumber: userProfile.phone_number || "",
          address: userProfile.address || "",
          username: userProfile.username || "",
        });

        if (userProfile.profile_image_url) {
          setUploadedImage(userProfile.profile_image_url);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleUploadClick = () => {
    // eslint-disable-next-line react/prop-types
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = async () => {
    if (isEditing) {
      try {
        const response = await fetch(
          "https://rent-management-service.onrender.com/auth/users/me/",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({
              first_name: profileData.firstName,
              middle_name: profileData.middleName,
              last_name: profileData.lastName,
              email: profileData.email,
              phone_number: profileData.phoneNumber,
              address: profileData.address,
              username: profileData.username,
              profile_image_url: uploadedImage,
            }),
          }
        );

        if (!response.ok) throw new Error("Failed to update profile data");

        const updatedProfile = await response.json();
        setProfileData((prev) => ({
          ...prev,
          ...updatedProfile,
        }));

        if (updatedProfile.profile_image_url) {
          setUploadedImage(updatedProfile.profile_image_url);
        }
      } catch (error) {
        console.error("Error updating profile data:", error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleBackClick = () => {
    setIsEditing(false);
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="font-semibold text-[40px] text-center my-52 left-1/2">
        Loading...
      </div>
    );
  }

  return (
    <div className="gap-10 pt-10 mb-20">
      <div className="flex pt-5 gap-[550px]">
        <div>
          <p className="text-3xl pb-2 font-bold">Account Settings</p>
        </div>
      </div>

      <div className="inline-flex">
        <div className="block h-[50rem] bg-gray-100 rounded-xl px-1 pt-3">
          <div className="flex items-center">
            <div className="w-36 h-36 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Profile"
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={handleImageClick}
                />
              ) : (
                <img
                  src={assets.Profile_Icon}
                  alt="Default Profile Icon"
                  className="block font-sans w-full h-full border-2 rounded-full"
                />
              )}
            </div>
            <button
              className="border-none mx-5 hover:bg-orange-700 text-lg transition ease-out duration-200 bg-orange-600 font-sans rounded-xl text-white px-12 py-3"
              onClick={handleUploadClick}
            >
              Upload
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>

          <div className="flex">
            <label>
              <span className="font-sans">First Name</span>
              <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="First Name"
                className="block font-sans w-44 border-2 rounded-[20px] bg-gray-100 my-1 py-5 px-3"
              />
            </label>
            <label>
              <span className="font-sans ml-4">Middle Name</span>
              <input
                type="text"
                name="middleName"
                value={profileData.middleName}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Middle Name"
                className="block font-sans w-44 border-2 rounded-[20px] bg-gray-100 mr-1 my-1 py-5 px-3 ml-1"
              />
            </label>
          </div>

          <div className="my-4 flex">
            <label>
              <span className="font-sans">Last Name</span>
              <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Last Name"
                className="block font-sans w-44 border-2 rounded-[20px] bg-gray-100 my-1 py-5 px-3"
              />
            </label>

            <label>
              <span className="font-sans">Username</span>
              <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Username"
                className="block font-sans w-44 border-2 rounded-[20px] bg-gray-100 mr-1 my-1 py-5 px-3 ml-1"
              />
            </label>
          </div>

          <div className="block">
            <span className="font-sans">Phone Number</span>
            <label htmlFor="phone" className="flex">
              <img
                src={assets.Nigeria}
                alt="Nigeria flag"
                className="block font-sans w-22 border-2 rounded-[20px] bg-gray-100 my-1 py-2 px-3"
              />
              <input
                type="text"
                name="phoneNumber"
                value={profileData.phoneNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Phone Number"
                className="block font-sans w-48 border-2 rounded-[20px] bg-gray-100 my-1 ml-1 py-5 px-3"
              />
            </label>
          </div>

          <div className="">
            <label>
              <span className="font-sans">Email</span>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Email"
                className="block font-sans w-[350px] border-2 rounded-[20px] bg-gray-100 mx-1 my-1 py-5 px-3"
              />
            </label>
            <label>
              <span className="font-sans">Address</span>
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Address"
                className="block font-sans w-[350px] border-2 rounded-[20px] bg-gray-100 mx-1 my-1 py-5 px-3"
              />
            </label>
          </div>

          <div className="mt-10 flex justify-end ">
            {isEditing ? (
              <div className="flex gap-6">
                <button
                  onClick={handleEditProfile}
                  className="border-none mx-2 hover:bg-blue-700 text-lg transition ease-out duration-200 bg-blue-600 font-sans rounded-xl text-white px-8 py-3"
                >
                  Save Changes ✏
                </button>
                <button
                  onClick={handleBackClick}
                  className="border-none mx-2 hover:bg-gray-700 text-lg transition ease-out duration-200 bg-gray-600 font-sans rounded-xl text-white px-8 py-3"
                >
                  Back
                </button>
              </div>
            ) : (
              <button
                onClick={handleEditProfile}
                className="border-none mx-2 hover:bg-orange-700 text-lg transition ease-out duration-200 bg-orange-600 font-sans rounded-xl text-white px-8 py-3"
              >
                Edit Profile ✏
              </button>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className={`${
            isVisible ? "opacity-100" : "opacity-0"
          } fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300`}
        >
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-xl font-semibold">Image Preview</h2>
            <img
              src={uploadedImage}
              alt="Profile Preview"
              className="w-80 h-80 object-cover rounded-lg mt-2"
            />
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-red-500 text-white rounded-lg px-4 py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
