import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaEllipsisH, FaEdit, FaTrash } from "react-icons/fa";

const PlayersSection = () => {
  const [players, setPlayers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState(null);
  const [formData, setFormData] = useState({
    Fullname: "",
    userName: "",
    phone: "",
    address: "",
    password: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/getAllPlayers"
      );
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const handleSubmit = async () => {
    const { Fullname, userName, phone, address, password } = formData;

    if (
      !Fullname.trim() ||
      !userName.trim() ||
      !phone.trim() ||
      !address.trim()
    ) {
      alert("All fields except password are required");
      return;
    }

    if (!editMode && !password.trim()) {
      alert("Password is required for new players");
      return;
    }

    try {
      if (editMode) {
        await axios.patch(
          `http://localhost:5000/api/admin/editPlayer/${editingPlayerId}`,
          {
            Fullname,
            userName,
            phone,
            address,
          }
        );
        alert("Player updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/admin/createPlayer", {
          Fullname,
          userName,
          phone,
          address,
          password,
        });
        alert("Player created successfully!");
      }

      fetchPlayers();
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      alert(
        `Failed to submit: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleEdit = (player) => {
    setEditMode(true);
    setEditingPlayerId(player.PlayerID);
    setFormData({
      Fullname: player.FullName,
      userName: player.userName,
      phone: player.Phone,
      address: player.Address,
      password: "",
    });
    setShowForm(true);
  };

  const handleDelete = async (playerId) => {
    
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this player?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        ` http://localhost:5000/api/admin/deletePlayer/${playerId}`
      );
      fetchPlayers();
      alert("Player deleted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert(
        `Failed to delete: ${error.response?.data?.message || error.message}`
      );
    }
  };
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, phone: value });
    }
  };

  const resetForm = () => {
    setFormData({
      Fullname: "",
      userName: "",
      phone: "",
      address: "",
      password: "",
    });
    setShowForm(false);
    setEditMode(false);
    setEditingPlayerId(null);
  };
  // Filter players based on searchTerm
  const filteredPlayers = players.filter((player) =>
    player.FullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Players</h2>
        <div className="flex gap-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by Full Name"
            className="bg-gray-600 text-white p-2 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Add Player Button */}
          <button
            className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm sm:text-base"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            <FaPlus className="mr-2" />
            Add Player
          </button>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`w-full max-w-md p-6 rounded-lg shadow-lg relative ${
              editMode ? "bg-slate-800 text-white" : "bg-gray-800 text-white"
            }`}
          >
            <button
              onClick={resetForm}
              className={`absolute top-2 right-3 text-xl ${
                editMode
                  ? "text-white hover:text-red-500"
                  : "text-white hover:text-red-500"
              }`}
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Player" : "Add New Player"}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.Fullname}
                onChange={(e) =>
                  setFormData({ ...formData, Fullname: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.userName}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.phone}
                onChange={handlePhoneChange}
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              {!editMode && (
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
                  editMode
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-green-500 hover:bg-green-600"
                } text-white px-4 py-2 rounded mt-4`}
                onClick={handleSubmit}
              >
                {editMode ? "Update Player" : "Save Player"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 rounded-lg text-sm sm:text-base text-white">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Full Name</th>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Address</th>
              <th className="py-3 px-4 text-left">Loyalty Points</th>
              <th className="py-3 px-4 text-left">Join Date</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center text-gray-400 py-10 italic"
                >
                  No players found.
                </td>
              </tr>
            ) : (
              filteredPlayers.map((player, index) => (
                <tr
                  key={player.PlayerID}
                  className={`${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  } border-b border-gray-600 hover:bg-gray-600`}
                >
                  <td className="py-3 px-4">{player.PlayerID}</td>
                  <td className="py-3 px-4">{player.FullName}</td>
                  <td className="py-3 px-4">{player.userName}</td>
                  <td className="py-3 px-4">{player.Phone}</td>
                  <td className="py-3 px-4">{player.Address}</td>
                  <td className="py-3 px-4">{player.LoyaltyPoints}</td>
                  <td className="py-3 px-4">
                    {new Date(player.join_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(player)}
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(player.PlayerID)}
                      className="text-red-400 hover:text-red-300"
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

export default PlayersSection;
