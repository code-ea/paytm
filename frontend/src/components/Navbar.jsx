import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-2 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-white text-2xl font-bold">Paytm Clone</h1>

        {/* Nav Links */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/about" className="text-white text-lg font-bold hover:text-gray-200">
              About
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="text-white text-lg font-bold hover:text-gray-200">
              Dashboard
            </Link>
          </li>

          {/* Combined Signup and Update Profile Button */}
          <li className="relative group">
            <button className="text-white text-lg font-bold hover:text-gray-200 focus:outline-none">
              Account
            </button>
            <div className="absolute right-0  w-40 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-300">
              <ul>
                <li>
                  <Link to="/signup" className="block px-4 py-2 text-lg text-blue-600 hover:bg-gray-200">
                    Signup
                  </Link>
                </li>
                <li>
                  <Link to="/edit" className="block px-4 py-2 text-lg text-blue-600 hover:bg-gray-200">
                    Update Profile
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};
