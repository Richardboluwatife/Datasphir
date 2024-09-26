import React, { useState } from "react";

function Post() {
  const [message, setMessage] = useState(""); // State to hold the message
  const [images, setImages] = useState([]); // State to hold uploaded images

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    const newImages = [...images, ...files]; // Append new images to the existing ones

    // Check if the total images exceed 10
    if (newImages.length <= 10) {
      setImages(newImages);
    } else {
      alert("You can only upload a maximum of 10 images."); // Alert if more than 10 images
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server or process it
    console.log("Message:", message);
    console.log("Images:", images);
    // Reset the fields after submission
    setMessage("");
    setImages([]);
  };

  return (
    <div className="p-4 border rounded shadow mt-16 bg-gray-200">
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={handleMessageChange}
          placeholder="What On Your Mind..."
          className="w-full p-2 border rounded mb-4"
          rows={4}
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="hidden" // Hide the default file input
          id="image-upload" // Set an ID for label reference
        />
        <label
          htmlFor="image-upload"
          className="flex items-center cursor-pointer mb-4"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full text-white mr-2">
            +
          </div>
          <span>
            {images.length > 0 ? "Add more pics" : "Add pic to your post"}
          </span>
        </label>
        <div className="flex flex-wrap gap-2 mb-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)} // Create a URL for the uploaded image
              alt={`Uploaded preview ${index + 1}`}
              className="w-20 h-20 object-cover rounded"
            />
          ))}
        </div>
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
