import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.png";
import AuthForm from "./AuthForm"; // Import the new component

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Booking", href: "#booking" },
    { name: "MemberShip", href: "#membership" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="relative z-50">
      <nav className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-100 backdrop-blur-md shadow-md rounded-full px-8 py-2 flex items-center justify-between w-[95%] md:w-[80%] z-50">
        <div className="w-12 h-12">
          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
        </div>

        <ul className="hidden sm:flex gap-6 text-gray-900 font-semibold items-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <a href={item.href} className="hover:text-green-600 transition">
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setShowLogin(true)}
          className="hidden sm:block bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
        >
          Sign in
        </button>

        <button
          className="sm:hidden text-2xl text-gray-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="absolute top-[calc(2rem+1.2rem)] left-1/2 pt-8 transform -translate-x-1/2 w-[95%] md:w-[80%] bg-white rounded-b-xl shadow-md py-4 text-center sm:hidden">
          <ul className="flex flex-col gap-3 text-gray-700">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="hover:text-green-600 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setShowLogin(true)}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
          >
            Sign in
          </button>
        </div>
      )}

      {/* Auth Form Modal */}
      <AuthForm show={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
};

export default Navbar;
