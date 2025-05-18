import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const User = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });
  const [editUserId, setEditUserId] = useState(null);

  const fetchUserRecords = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/getAllUsers"
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users's records:", error);
      alert("Failed to fetch users's records.");
    }
  };

  useEffect(() => {
    fetchUserRecords();
  }, []);

  const handleSubmit = async () => {
    const { fullName, email, phone, role, password } = formData;

    if (!fullName || !email || !phone || !role || (!editUserId && !password)) {
      alert("All fields are required.");
      return;
    }

    try {
      if (editUserId) {
        // Updated to use the correct endpoint
        await axios.patch(
          `http://localhost:5000/api/admin/editUser/${editUserId}`,
          {
            fullName,
            email,
            phone,
            role,
            // Note: Your backend editUser function doesn't expect password
            // So I'm removing it from the edit request
          }
        );
        alert("User updated successfully.");
      } else {
        await axios.post("http://localhost:5000/api/admin/CreateUser", {
          fullName,
          email,
          phone,
          role,
          password,
        });
        alert("User created successfully.");
      }

      await fetchUserRecords();
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Failed to save user.");
    }

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      role: "",
      password: "",
    });
    setEditUserId(null);
    setShowForm(false);
  };

  const handleEdit = (user) => {
    setFormData({
      fullName: user.FullName,
      email: user.Email,
      phone: user.Phone,
      role: user.Role,
      password: "",
    });
    setEditUserId(user.UserID);
    setShowForm(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/admin/deleteUser/${userId}`
        );
        await fetchUserRecords();
        alert("User deleted successfully.");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <button
          className="mb-4 bg-green-500 flex flex-row justify-center gap-2 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setShowForm(true);
            setEditUserId(null);
            setFormData({
              fullName: "",
              email: "",
              phone: "",
              role: "",
              password: "",
            });
          }}
        >
          <FaPlus className="mt-1" /> Add User
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`bg-gray-800 ${
              editUserId ? " " : ""
            } w-full max-w-md p-6 rounded-lg shadow-lg relative`}
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-white hover:text-red-400 text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {editUserId ? "Edit User" : "Add New User"}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Phone"
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <select
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
                <option value="Cafe">Cafe</option>
              </select>
              {!editUserId && (
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-gray-600 p-2 rounded text-white"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              )}
              <button
                className={`w-full ${
                  editUserId
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white px-4 py-2 rounded mt-4`}
                onClick={handleSubmit}
              >
                {editUserId ? "Update User" : "Save User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 rounded-lg text-white text-sm sm:text-base">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="py-3 px-4 text-left">User ID</th>
              <th className="py-3 px-4 text-left">Full Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Created At</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center text-gray-400 py-10 italic"
                >
                  No users added yet. Click <strong>"Add User"</strong> to get
                  started!
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.UserID}
                  className={`${
                    user.UserID % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  } border-b border-gray-600 hover:bg-gray-600`}
                >
                  <td className="py-3 px-4">{user.UserID}</td>
                  <td className="py-3 px-4">{user.FullName}</td>
                  <td className="py-3 px-4">{user.Email}</td>
                  <td className="py-3 px-4">{user.Phone}</td>
                  <td className="py-3 px-4">{user.Role}</td>
                  <td className="py-3 px-4">
                    {new Date(user.CreatedAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-yellow-400 hover:text-yellow-300 px-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user.UserID)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
