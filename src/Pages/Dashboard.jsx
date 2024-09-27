// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { assets } from "../assets/assets"; // Ensure to have white versions of these images

// eslint-disable-next-line react/prop-types
function Dashboard({ uploadedImage }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [isLikedComment, setIsLikedComment] = useState(false);

  // eslint-disable-next-line no-unused-vars, no-undef
  const handleLikeClick = () => setIsLiked((prev) => !prev);

  const handleRepostClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000);
  };

  const handleSendClick = () => setShowCommentInput((prev) => !prev);

  const handleCloseCommentPopup = () => setShowCommentInput(false);

  // eslint-disable-next-line no-unused-vars
  const handleCommentLikeClick = () => setIsLikedComment((prev) => !prev);

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-2 pt-16">
      <div className="border-b border-black ">
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
            className="absolute top-10 left-12 w-5 h-5"
          />
        </div>

        <h1 className="xs:pl-0.5 font-semibold pb-2">Add Story</h1>
      </div>

      <div className="border-b border-black">
        <div className="">
          <div className="">
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
              <img
                src={assets.Post}
                alt="Post"
                className="h-80 w-96 object-cover"
              />
            </div>

            <div className="flex py-3 gap-8 border-b border-black">
              <div className="flex items-center">
                <div className="flex items-center">
                  <button
                    onClick={handleLike}
                    className={`flex items-center p-2 rounded-full ${
                      liked ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    <span className={liked ? "text-red-500" : "text-gray-500"}>
                      {liked ? "❤️" : "🤍"}
                    </span>
                  </button>
                  <span className="ml-2 text-gray-500">{likesCount}</span>
                </div>
              </div>
              <div className="flex items-center" onClick={handleSendClick}>
                <img src={assets.Chat} alt="Comments" className="h-6 w-6" />
                <p className="pl-1">1K</p>
              </div>
              <div className="flex items-center cursor-pointer">
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
                  }`}
                />
                <p className="pl-1">1M</p>
              </div>
              <div className="flex items-center">
                <img src={assets.Follow} alt="Follow" className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Comment Input Popup */}
        {showCommentInput && (
          <div className="absolute top-60 left-1/2 transform -translate-x-1/2 p-4 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 rounded-lg shadow-lg z-10 w-full h-[480px] flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold ml-28">1,447 comments</h3>
              <p
                className="ml-10 text-3xl cursor-pointer"
                onClick={handleCloseCommentPopup}
              >
                ×
              </p>
            </div>
            <div className="flex-grow">
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
                <div className=" pl-2">
                  <p className="pl-2 text-xs">@richardboluwatife</p>
                  <p>10 years still Counting</p>
                  <div className="flex gap-10">
                    <p>12hrs ago</p>
                    <div className="flex items-center">
                      <button
                        onClick={handleLike}
                        className={`flex items-center rounded-full ${
                          liked ? "text-red-500" : "text-gray-500"
                        }`}
                      >
                        <span
                          className={liked ? "text-red-500" : "text-gray-500"}
                        >
                          {liked ? "❤️" : "🤍"}
                        </span>
                      </button>
                      <span className="ml-2 text-gray-500">{likesCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Type your comment..."
                className="w-full p-2 mt-2 border border-gray-400 rounded-md focus:outline-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleCloseCommentPopup}
                  className="px-4 py-1 bg-blue-500 text-white rounded-md"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
