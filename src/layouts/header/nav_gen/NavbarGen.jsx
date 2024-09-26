// eslint-disable-next-line no-unused-vars
import React from "react";
import { assets } from "../../../assets/assets";
import { NavLink } from "react-router-dom";

function NavbarGen() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow flex items-center justify-between px-5 py-3 z-10">
      <NavLink to="/dashboard">
        <h1 className="text-xl font-semibold">Datasphir</h1>
      </NavLink>
      <NavLink to="/post">
        <img src={assets.More} alt="More" className="w-10 h-10" />
      </NavLink>
    </div>
  );
}

export default NavbarGen;
