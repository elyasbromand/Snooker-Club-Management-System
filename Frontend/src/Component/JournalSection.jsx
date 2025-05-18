import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const JournalSection = () => {
  const [journals, setJournals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    amount: "",
    description: "",
    related: "",
    createdBy: "",
  });

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/checkSession", {
        withCredentials: true, 
      });
      setUserId(res.data.user.userId);
    } catch (err) {
      console.error("Failed to fetch user", err);
      alert("User not logged in.");
    }
  };

  fetchUser();
}, []);

  const fetchJournals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/getAllJournalEntries"
      );
      setJournals(response.data.journals);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
      alert("Failed to fetch journal data.");
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const handleSubmit = async () => {
  const { title, type, amount, description, related } = formData;

  if (!title || !type || !amount || !description || !related) {
    alert("All fields are required.");
    return;
  }

  if (!userId) {
    alert("User session not found.");
    return;
  }

  if (isNaN(amount) || Number(amount) <= 0) {
    alert("Amount must be a positive number.");
    return;
  }

  try {
    const payload = {
      title,
      type,
      amount: Number(amount),
      description,
      related,
      createdBy: userId,
    };

    if (isEditMode) {
      await axios.patch(
        `http://localhost:5000/api/admin/editJournal/${editingId}`,
        payload
      );
      alert("Journal entry updated successfully!");
    } else {
      await axios.post(
        "http://localhost:5000/api/admin/createJournalEntry",
        payload
      );
      alert("Journal entry added successfully!");
    }

    fetchJournals();
    setFormData({
      title: "",
      type: "",
      amount: "",
      description: "",
      related: "",
      createdBy: "",
    });
    setShowForm(false);
    setIsEditMode(false);
    setEditingId(null);
  } catch (error) {
    console.error("Error:", error);
    alert(
      `Failed to submit: ${error.response?.data?.message || error.message}`
    );
  }
};


  const handleEdit = (entry) => {
    setFormData({
      title: entry.Title,
      type: entry.Type,
      amount: entry.Amount,
      description: entry.Description,
      related: entry.RelatedTo,
      createdBy: entry.CreatedBy,
    });
    setIsEditMode(true);
    setEditingId(entry.JournalID);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this journal entry?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/deleteJournal/${id}`);
      fetchJournals();
      alert("Entry deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      alert(
        `Failed to delete: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h2 className="text-2xl font-semibold">Journal Entries</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by title or type..."
            className="bg-gray-700 text-white p-2 rounded w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-green-500 flex items-center gap-2 hover:bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => {
              setFormData({
                title: "",
                type: "",
                amount: "",
                description: "",
                related: "",
                createdBy: "",
              });
              setIsEditMode(false);
              setShowForm(true);
            }}
          >
            <FaPlus /> Add Journal Entry
          </button>
        </div>
      </div>

      {/* Modal Form */}
      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`bg-gray-800 w-full max-w-md p-6 rounded-lg shadow-lg relative ${
              isEditMode ? "" : ""
            }`}
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-white hover:text-red-400 text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {isEditMode ? "Edit Journal Entry" : "Add Journal Entry"}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <select
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="">Select Type</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
              <input
                type="number"
                placeholder="Amount"
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                className="w-full bg-gray-600 p-2 rounded text-white"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <select
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.related}
                onChange={(e) =>
                  setFormData({ ...formData, related: e.target.value })
                }
              >
                <option value="">Select Related to</option>
                <option value="Cafe">Cafe</option>
                <option value="Equipment">Club</option>
              </select>

              {/* <select
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.createdBy}
                onChange={(e) =>
                  setFormData({ ...formData, createdBy: e.target.value })
                }
              >
                <option value="">Created by</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select> */}

              <button
                className={`w-full ${
                  isEditMode
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white px-4 py-2 rounded mt-4`}
                onClick={handleSubmit}
              >
                {isEditMode ? "Update Entry" : "Save Entry"}
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
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Related</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Added By</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {journals.filter(
              (entry) =>
                entry.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                entry.Type.toLowerCase().includes(searchTerm.toLowerCase())
            ).length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="text-center text-gray-400 py-10 italic"
                >
                  No journal entries found. Try a different search or{" "}
                  <strong>add a new entry</strong>.
                </td>
              </tr>
            ) : (
              journals
                .filter(
                  (entry) =>
                    entry.Title.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    ) ||
                    entry.Type.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((entry, index) => (
                  <tr
                    key={entry.JournalID}
                    className={`${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                    } border-b border-gray-600 hover:bg-gray-600`}
                  >
                    <td className="py-3 px-4">{entry.JournalID}</td>
                    <td className="py-3 px-4">{entry.Title}</td>
                    <td className="py-3 px-4">{entry.Type}</td>
                    <td className="py-3 px-4">{entry.Amount}</td>
                    <td className="py-3 px-4">{entry.Description}</td>
                    <td className="py-3 px-4">{entry.RelatedTo}</td>
                    <td className="py-3 px-4">
                      {new Date(entry.EntryDate).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3 px-4">{entry.CreatedBy}</td>
                    <td className="py-3 px-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(entry)}
                        className="flex items-center gap-1 text-yellow-400 hover:text-yellow-500 py-1 rounded text-md"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(entry.JournalID)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-600 py-1 rounded text-md"
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

export default JournalSection;
