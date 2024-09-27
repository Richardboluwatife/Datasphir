import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets"; // Ensure to have white versions of these images

// eslint-disable-next-line react/prop-types
function Dashboard({ uploadedImage }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState({});
  const [comment, setComment] = useState("");
  const [homeFeed, setHomeFeed] = useState([]); // State to hold fetched data
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState({}); // State to hold likes for each post and comment

  // Fetch home feed on component mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Authorization token is missing. Please log in.");
      return;
    }

    const fetchHomeFeed = async () => {
      try {
        const response = await fetch(
          "https://datasphir-blog-app.onrender.com/blogs/home-feed/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          
          setHomeFeed(data["post details"]);

          // Initialize likes for each post and comment
          const initialLikes = {};
          data["post details"].forEach((post) => {
            initialLikes[post.id] = { liked: false, count: 0 };
            post.post_comments.forEach((comment) => {
              initialLikes[comment.id] = { liked: false, count: 0 };
            });
          });
          setLikes(initialLikes);
        } else {
          const errorData = await response.json();
          setError(errorData?.detail || "Failed to fetch home feed");
        }
      } catch (err) {
        console.error("Error fetching home feed:", err);
        setError("An error occurred while fetching the home feed.");
      }
    };

    fetchHomeFeed();
  }, []);

  const handleLike = (id) => {
    setLikes((prev) => {
      const isLiked = prev[id]?.liked;
      return {
        ...prev,
        [id]: {
          liked: !isLiked,
          count: isLiked ? prev[id].count - 1 : prev[id].count + 1,
        },
      };
    });
  };

  const handleSendClick = (postId) => {
    setShowCommentInput((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCloseCommentPopup = (postId) => {
    setShowCommentInput((prev) => ({
      ...prev,
      [postId]: false,
    }));
  };

  const handleCommentSubmit = async (postId) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("Authorization token is missing. Please log in."); // Log token error
      setError("Authorization token is missing. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `https://datasphir-blog-app.onrender.com/blogs/create-comment/${postId}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: comment, post: "6" }), // Send the comment body
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Comment submitted successfully:", data); // Log successful submission
        setComment(""); // Clear the comment input
      } else {
        const errorData = await response.json();
        console.error("Error response from server:", errorData); // Log error response
        setError(errorData?.detail || "Failed to submit comment");
      }
    } catch (err) {
      console.error("Error submitting comment:", err); // Log any other errors
      setError("An error occurred while submitting the comment.");
    }
  };


  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-2 pt-16 xs:w-[370px] pb-16">
      {/* Error Message */}
      {error && <div className="text-red-500 p-2">{error}</div>}

      {/* Home Feed Content */}
      <div className="relative border-b border-black pb-2">
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
      {homeFeed.length > 0 ? (
        homeFeed.map((post) => (
          <div key={post.id} className="border-b border-black">
            <h1 className="xs:pl-0.5 font-semibold pb-2">{post.title}</h1>

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
              <p className="pl-2 text-xl">@{post.name_of_owner || "Unknown"}</p>
              <div className="flex justify-end w-full">
                <p className="pl-2 text-xl">3hrs</p>
              </div>
            </div>

            <div className="pt-2 w-[350px]">
              <p className="break-words">{post.body}</p>
            </div>

            <div className="flex py-3 gap-8 border-b border-black">
              <div className="flex items-center">
                <div className="flex items-center">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center p-2 rounded-full ${
                      likes[post.id]?.liked ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    <span
                      className={
                        likes[post.id]?.liked ? "text-red-500" : "text-gray-500"
                      }
                    >
                      {likes[post.id]?.liked ? "❤️" : "🤍"}
                    </span>
                  </button>
                  <span className="ml-2 bg-white dark:bg-gray-800 text-black dark:text-white">
                    {likes[post.id]?.count}
                  </span>
                </div>
              </div>
              <div
                className="flex items-center"
                onClick={() => handleSendClick(post.id)}
              >
                <img src={assets.Chat} alt="Comments" className="h-6 w-6" />
                <p className="pl-1">{post.number_of_comments}</p>
              </div>
              <div className="flex items-center cursor-pointer">
                <img src={assets.Send} alt="Shares" className="h-6 w-6" />
                <p className="pl-1">5.3K</p>
              </div>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setIsSpinning(true);
                  setTimeout(() => setIsSpinning(false), 1000);
                }}
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

            {/* Comment Input Popup */}
            {showCommentInput[post.id] && (
              <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 rounded-lg shadow-lg z-10 w-full max-w-md h-[550px]">
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-lg font-semibold mx-auto">
                    {post.number_of_comments} comments
                  </h3>
                  <button
                    onClick={() => handleCloseCommentPopup(post.id)}
                    className="text-red-500 hover:text-red-700 text-3xl"
                  >
                    ×
                  </button>
                </div>

                {/* Render Comments */}
                <div className="overflow-y-auto h-[430px] border border-gray-300 rounded-lg p-2">
                  {post.post_comments.map((comment) => (
                    <div key={comment.id} className="flex items-start mb-2">
                      <img
                        src={uploadedImage || assets.Profile_Icon}
                        alt="Commenter"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="ml-2">
                        <p className="text-sm">
                          @{post.name_of_owner || "Unknown"}
                        </p>
                        {/* <p className="font-semibold">{comment.owner}</p> */}
                        <p>{comment.body}</p>
                        <div className="flex items-center pl-56">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleLike(post.id)}
                              className={`flex items-center p-2 rounded-full ${
                                likes[post.id]?.liked
                                  ? "text-red-500"
                                  : "text-gray-500"
                              }`}
                            >
                              <span
                                className={
                                  likes[post.id]?.liked
                                    ? "text-red-500"
                                    : "text-gray-500"
                                }
                              >
                                {likes[post.id]?.liked ? "❤️" : "🤍"}
                              </span>
                            </button>
                            <span className="ml-2 bg-white dark:bg-gray-800 text-black dark:text-white">
                              {likes[post.id]?.count}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-2 flex items-center">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 border border-gray-300 rounded-lg p-2"
                  />
                  <button
                    onClick={() => handleCommentSubmit(post.id)}
                    className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default Dashboard;
