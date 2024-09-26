// eslint-disable-next-line no-unused-vars
import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

// eslint-disable-next-line react/prop-types
function Footer({ uploadedImage }) {
  return (
    <div className="fixed bottom-0 left-0 right-0">
      <footer className="flex justify-between px-5 py-2 bg-white shadow">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `group w-10 h-10 flex items-center justify-center rounded-full transition bg-gray-300 ${
              isActive ? "bg-grey-400" : ""
            }`
          }
          end
        >
          <img src={assets.Home} alt="Home" className="w-8 h-8" />
        </NavLink>

        <NavLink
          to="/post"
          className={({ isActive }) =>
            `group  w-10 h-10 flex items-center justify-center rounded-full transition bg-gray-300 ${
              isActive ? "bg-grey-700" : ""
            }`
          }
          end
        >
          <img src={assets.More} alt="More" className="w-10 h-10" />
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `group w-10 h-10 flex items-center justify-center rounded-full transition bg-gray-300 ${
              isActive ? "bg-grey-400" : ""
            }`
          }
          end
        >
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
              className="block font-sans w-full h-full border-2 rounded-full"
            />
          )}
        </NavLink>
      </footer>
    </div>
  );
}

export default Footer;
