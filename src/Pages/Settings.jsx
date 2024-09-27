// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";

// eslint-disable-next-line react/prop-types
function Settings({ fileInputRef }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          "https://datasphir-blog-app.onrender.com//auth/users/me/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            redirect: "follow",
          }
        );
        if (!response.ok) throw new Error("Failed to fetch profile data");

        const userProfile = await response.json();
        setProfileData({
          firstName: userProfile.first_name || "",
          lastName: userProfile.last_name || "",
          email: userProfile.email || "",
          phoneNumber: userProfile.phone_number || "",
          username: userProfile.username || "",
        });

        if (userProfile.profile_image_url) {
          setUploadedImage(userProfile.profile_image_url);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleUploadClick = () => {
    // eslint-disable-next-line react/prop-types
    if (fileInputRef?.current) fileInputRef.current.click();
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
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          "https://datasphir-blog-app.onrender.com//auth/users/me/",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              first_name: profileData.firstName,
              last_name: profileData.lastName,
              email: profileData.email,
              phone_number: profileData.phoneNumber,
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
        console.error("Error updating profile data:", error.message);
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

  // eslint-disable-next-line no-unused-vars
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  if (isLoading) {
    return (
      <div className="font-semibold text-[40px] text-center my-52">
        Loading...
      </div>
    );
  }

  return (
    <div className="gap-10 pt-10 mb-20">
      <div className="flex pt-5 gap-[550px]">
        <div>
          <p className="text-3xl pb-2 font-bold">Account Settings</p>
          {/* <button
            onClick={toggleDarkMode}
            className="fixed top-24 right-4 p-2 bg-gray-300 dark:bg-gray-700 rounded"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button> */}
        </div>
      </div>

      <div className="inline-flex">
        <div className="block h-[45rem] bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-4 rounded-xl px-1 pt-3">
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
                className="block font-sans w-44 border-2 rounded-[20px] bg-gray-100 my-1 py-5 px-3 dark:bg-gray-800 text-black dark:text-white"
              />
            </label>

            <label>
              <span className="font-sans pl-2">Last Name</span>
              <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Last Name"
                className="block font-sans w-44 border-2 rounded-[20px] bg-gray-100 mr-1 my-1 py-5 px-3 ml-1 dark:bg-gray-800 text-black dark:text-white"
              />
            </label>
          </div>

          <div className="my-4 flex">
            <label>
              <span className="font-sans">Username</span>
              <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Username"
                className="block font-sans w-[350px] border-2 rounded-[20px] bg-gray-100 mx-1 my-1 py-5 px-3 dark:bg-gray-800 text-black dark:text-white"
              />
            </label>
          </div>

          <div className="flex">
            <span className="font-sans pt-6 pl-5">Phone Number</span>
            <label htmlFor="phone" className="flex">
              <input
                type="text"
                name="phoneNumber"
                value={profileData.phoneNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Phone Number"
                className="block font-sans w-48 border-2 rounded-[20px] bg-gray-100 my-1 ml-5 py-5 px-3 dark:bg-gray-800 text-black dark:text-white"
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
                className="block font-sans w-[350px] border-2 rounded-[20px] bg-gray-100 mx-1 my-1 py-5 px-3 dark:bg-gray-800 text-black dark:text-white"
              />
            </label>
          </div>

          <div className="mt-10 flex justify-end">
            {isEditing ? (
              <div className="flex gap-10">
                <button
                  onClick={handleEditProfile}
                  className="border-none mx-2 hover:bg-blue-700 text-lg transition ease-out duration-200 bg-blue-600 font-sans rounded-xl text-white px-5 py-3"
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
        <div className={`modal ${isVisible ? "visible" : "invisible"}`}>
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <img src={uploadedImage} alt="Uploaded" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
