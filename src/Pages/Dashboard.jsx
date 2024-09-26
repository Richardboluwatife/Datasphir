// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"; // Import useState
import { assets } from "../assets/assets";

// eslint-disable-next-line react/prop-types
function Dashboard({ uploadedImage }) {
  // State to manage the like status
  const [isLiked, setIsLiked] = useState(false);

  // State to manage the spin status for the repost icon
  const [isSpinning, setIsSpinning] = useState(false);

  // Function to toggle the like status
  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
  };

  // Function to handle repost click
  const handleRepostClick = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false); // Reset spin state after the animation duration
    }, 1000); // Duration should match the CSS animation duration
  };

  return (
    <div className="xs:pt-16">
      <div className="border-b border-black">
        <div className="relative">
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <img
              src={assets.Profile_Icon}
              alt="Default Profile Icon"
              className="block w-16 h-16 border-2 rounded-full"
            />
          )}
          <img
            src={assets.Circle}
            alt="Circle Decoration"
            className="absolute top-10 left-12 w-5 h-5" // Adjust these values as needed
          />
        </div>
        <h1 className="xs:pl-0.5 font-semibold pb-2">Add Story</h1>
      </div>

      <div className="border-b border-black">
        <div className="pt-2 flex items-center">
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <img
              src={assets.Profile_Icon}
              alt="Default Profile Icon"
              className="block w-10 h-10 border-2 rounded-full"
            />
          )}
          <p className="pl-2 text-xl">@richardboluwatife</p>
          <div className="flex justify-end w-full">
            <p className="pl-2 text-xl">3hrs</p>
          </div>
        </div>

        <div className="pt-2">
          <p>
            Quiz A: State one of the objectives of the Datasphir Student
            Outreach Initiative. Quiz B: What does the federated identity
            bootcamp aim to enhance? Reply together.
          </p>
        </div>

        <div className="pt-2">
          <img src={assets.Post} alt="Post" className="h-80 w-96" />
        </div>

        <div className="flex py-3 gap-8">
          <div className="flex items-center" onClick={handleLikeClick}>
            <img
              src={isLiked ? assets.heartLike : assets.Heart} // Change source based on isLiked state
              alt="Likes"
              className="h-6 w-6" // Keep size constant
            />
            <p className="pl-1">509</p>
          </div>
          <div className="flex items-center">
            <img src={assets.Chat} alt="Comments" className="h-6 w-6" />
            <p className="pl-1">1K</p>
          </div>
          <div className="flex items-center">
            <img src={assets.Send} alt="Shares" className="h-6 w-6" />
            <p className="pl-1">5.3K</p>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={handleRepostClick}
          >
            <img
              src={assets.Repeat}
              alt="Reposts"
              className={`h-6 w-6 transition-transform duration-1000 ${
                isSpinning ? "animate-spin" : ""
              }`} // Apply spin animation class conditionally
            />
            <p className="pl-1">1M</p>
          </div>
          <div className="flex items-center">
            <img src={assets.Follow} alt="Follow" className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
