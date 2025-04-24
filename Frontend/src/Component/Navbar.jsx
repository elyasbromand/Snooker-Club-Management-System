import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Booking", href: "#booking" },
    { name: "MemberShip", href: "#membership" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (isRegister) {
      if (!formData.fullName) newErrors.fullName = "Full name is required";
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Confirm your password";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
      if (!formData.phone) newErrors.phone = "Phone number is required";
      if (!formData.address) newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle login or registration
      alert(`${isRegister ? "Registered" : "Logged in"} successfully!`);
      setShowLogin(false);
      setFormData({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
      });
      setErrors({});
    }
  };

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

      {/* Auth Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-center text-green-600 mb-4">
              {isRegister ? "Create Account" : "Login"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="w-full p-2 border rounded"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              )}
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full p-2 border rounded"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                value={formData.password}
                onChange={handleChange}
              />
              {isRegister && (
                <>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full p-2 border rounded"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full p-2 border rounded"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <textarea
                    name="address"
                    placeholder="Full Address"
                    className="w-full p-2 border rounded"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </>
              )}

              {/* Error messages */}
              {Object.keys(errors).map((key) => (
                <p key={key} className="text-red-500 text-sm">
                  {errors[key]}
                </p>
              ))}

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full"
              >
                {isRegister ? "Register" : "Login"}
              </button>

              <p className="text-center mt-2 text-sm">
                {isRegister
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-green-600 underline"
                >
                  {isRegister ? "Login" : "Create Account"}
                </button>
              </p>
            </form>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-lg"
              onClick={() => setShowLogin(false)}
            >
              <FiX />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
