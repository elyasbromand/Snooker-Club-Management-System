import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthForm = ({ show, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    role: "player",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.role) newErrors.role = "Please select a role";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (!isRegister) {
        try {
          // Player Login (existing logic)
          if (formData.role === "player") {
            // console.log(formData.username + formData.password);
            const res = await axios.post(
              "http://localhost:5000/api/players/login",
              {
                username: formData.username,
                password: formData.password,
              }
            );
            if (res.data.message === "login successful") {
              navigate("/personal-dashboard", { state: { user: res.data } });
              onClose();
            } else {
              alert(res.data.message);
            }
          }
          // Staff/Admin Login (new logic)
          else if (formData.role === "staff") {
            const res = await axios.post(
              "http://localhost:5000/api/admin/adminLogin",
              {
                username: formData.username,
                password: formData.password,
              },
              { withCredentials: true } // Required for sessions
            );
            if (res.data.message === "Login successful!") {
              navigate("/admin-dashboard"); // Redirect to admin dashboard
              onClose();
            } else {
              alert(res.data.error || "Login failed");
            }
          }
        } catch (err) {
          console.error("Login error:", err);
          alert(err.response?.data?.error || "Login failed");
        }
      } else {
        // ✅ Registration logic here
        try {
          await axios.post("http://localhost:5000/api/players", {
            fullName: formData.fullName,
            userName: formData.username, // match input name
            password: formData.password,
            phone: formData.phone,
            address: formData.address,
          });

          alert("Account created successfully!");
          setIsRegister(false); // optional: switch to login mode after register
          setFormData({
            fullName: "",
            username: "",
            password: "",
            confirmPassword: "",
            phone: "",
            address: "",
          });
          setErrors({});
          onClose();
        } catch (error) {
          alert("Failed to create account");
          console.error(error);
        }
      }
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="relative bg-white w-[90%] max-w-md p-6 rounded-xl shadow-lg">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-lg"
          onClick={onClose}
        >
          <FiX />
        </button>

        <h2 className="text-xl font-bold text-center text-green-600 mb-4">
          {isRegister ? "Create Account" : "Login"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="text-black text-left space-y-1"
        >
          {/* Add Role Selection Dropdown */}
          {!isRegister && (
            <label className="block mb-2">
              Role
              <select
                name="role"
                className="w-full mt-1 p-2 border rounded"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="player">Player</option>
                <option value="staff">Staff</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role}</p>
              )}
            </label>
          )}

          {isRegister && (
            <label className="block mb-2">
              Full Name
              <input
                type="text"
                name="fullName"
                className="w-full mt-1 p-2 border rounded"
                value={formData.fullName}
                onChange={handleChange}
              />
            </label>
          )}

          <label className="block mb-2">
            Username
            <input
              type="text"
              name="username"
              className="w-full mt-1 p-2 border rounded"
              value={formData.username}
              onChange={handleChange}
            />
          </label>

          <label className="block mb-2">
            Password
            <input
              type="password"
              name="password"
              className="w-full mt-1 p-2 border rounded"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          {isRegister && (
            <>
              <label className="block mb-2">
                Confirm Password
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full mt-1 p-2 border rounded"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </label>
              <label className="block mb-2">
                Phone Number
                <input
                  type="text"
                  name="phone"
                  className="w-full mt-1 p-2 border rounded"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </label>
              <label className="block mb-2">
                Full Address
                <textarea
                  name="address"
                  className="w-full mt-1 p-2 border rounded"
                  value={formData.address}
                  onChange={handleChange}
                />
              </label>
            </>
          )}

          {Object.keys(errors).map((key) => (
            <p key={key} className="text-red-500 text-sm">
              {errors[key]}
            </p>
          ))}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full mt-3"
          >
            {isRegister ? "Register" : "Login"}
          </button>

          <p className="text-center mt-3 text-sm">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-green-600 underline"
            >
              {isRegister ? "Login" : "Create Account"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
