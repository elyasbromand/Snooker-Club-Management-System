import React, { useState } from "react";
import axios from "axios";

const BecomeMember = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.userName) newErrors.userName = "userName is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("✅ handleSubmit triggered");

    if (validateForm()) {
      console.log("📤 Sending data to backend:", formData);

      try {
        await axios.post("http://localhost:5000/api/players", {
          fullName: formData.fullName,
          password: formData.password,
          userName: formData.userName,
          phone: formData.phone,
          address: formData.address,
        });

        alert("Account created successfully!");
        setShowModal(false);
        setFormData({
          fullName: "",
          userName: "",
          password: "",
          confirmPassword: "",
          phone: "",
          address: "",
        });
        setErrors({});
      } catch (error) {
        alert("Failed to create account");
        console.error(error);
      }
    }
  };
  return (
    <div
      className="relative w-full h-72 bg-cover bg-center mx-auto"
      style={{ backgroundImage: "url('hero5.jpg')" }}
    >
      <div className="absolute inset-0 rounded-xl bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-6 md:px-16 py-12 text-white">
        <div className="max-w-xl text-left space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-400">
            Become A Member
          </h1>
          <p className="text-md md:text-lg">
            Our world-class coaching programs, professional-grade tables, and competitive league system provide the perfect training ground to elevate your game
          </p>
        </div>

        <div className="mt-10 md:mt-0 flex flex-col space-y-4">
          <button
            className="px-6 py-3 bg-amber-400 hover:bg-green-600 rounded-xl font-semibold transition"
            onClick={() => {
              console.log("🟨 Create Account button clicked");
              setShowModal(true);
            }}
          >
            Create Account
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-center text-green-600">
              Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

              <input
                type="text"
                placeholder="User Name"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}

              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BecomeMember;
