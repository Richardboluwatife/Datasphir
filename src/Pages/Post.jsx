// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

function Post() {
  const [message, setMessage] = useState(""); // State to hold the message

  // Retrieve the access token from localStorage
  const token = localStorage.getItem("access_token");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the token is available
    if (!token) {
      alert("Authorization token is missing. Please log in.");
      return;
    }

    try {
      // Send the message data to the API with authorization header
      const response = await fetch(
        "https://datasphir-blog-app.onrender.com/blogs/create-post/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
            Authorization: `Bearer ${token}`, // Add the Authorization header with the Bearer token
          },
          body: JSON.stringify({
            body: message, // Send only the message in the request body
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Post created successfully:", result);
        // Reset the message field after submission
        setMessage("");
      } else {
        const errorData = await response.json();
        console.error("Failed to create post:", errorData?.detail || errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="p-4 border rounded shadow mt-16 bg-white dark:bg-gray-800 text-black dark:text-black">
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={handleMessageChange}
          placeholder="What On Your Mind..."
          className="w-full p-2 border rounded mb-4"
          rows={4}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
