
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavbarGen from "./NavbarGen";
import Footer from "../../footer/MainFooter"; // Adjust the import as per your file structure

function ParentComponent() {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Toaster />
      <NavbarGen />
      <Outlet />
      <Footer uploadedImage={uploadedImage} />
    </div>
  );
}

export default ParentComponent;
