import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const TableManagement = () => {
  const [tables, setTables] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newTable, setNewTable] = useState({ type: "", name: "", charges: "" });
  const [editTable, setEditTable] = useState({
    id: "",
    type: "",
    name: "",
    charges: "",
  });

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/getTable"
        );
        setTables(response.data.tables);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };
    fetchTables();
  }, []);

   const handleCreateSubmit = async () => {
    try {
      if (!newTable.type || !newTable.name || !newTable.charges) {
        alert("All fields are required");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/admin/createTable",
        {
          TableNumber: newTable.name,
          TableType: newTable.type,
          HourlyRate: Number(newTable.charges)
        }
      );
      
      alert("Table created successfully!");
      const res = await axios.get("http://localhost:5000/api/admin/getTable");
      setTables(res.data.tables);
      setNewTable({ type: "", name: "", charges: "" });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error while creating table:", error);
      alert(`Failed to create: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleEditSubmit = async () => {
    try {
      if (!editTable.type || !editTable.name || !editTable.charges) {
        alert("All fields are required");
        return;
      }

      const response = await axios.patch(
        `http://localhost:5000/api/admin/editTable/${editTable.id}`,
        {
          TableNumber: editTable.name,
          TableType: editTable.type,
          HourlyRate: Number(editTable.charges)
        }
      );
      
      alert("Table updated successfully!");
      const res = await axios.get("http://localhost:5000/api/admin/getTable");
      setTables(res.data.tables);
      setShowEditForm(false);
    } catch (error) {
      console.error("Error updating table:", error);
      alert(`Failed to update: ${error.response?.data?.message || error.message}`);
    }
  };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this table?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/admin/deleteTable/${id}`);
//         const updated = await axios.get("http://localhost:5000/api/admin/getTable");
//         setTables(updated.data.tables);
//         alert("Table deleted successfully!");
//       } catch (error) {
//         console.error("Error deleting table:", error);
//         alert(`Failed to delete: ${error.response?.data?.message || error.message}`);
//       }
//     }
//   };

  return (
    <div className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-white">Game Tables</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm sm:text-base"
        >
          <FaPlus className="mr-2" />
          Create New
        </button>
      </div>

      {/* Create Table Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 w-full max-w-md mx-auto p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowCreateForm(false)}
              className="absolute top-2 right-3 text-white hover:text-red-400 text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold text-white mb-4">
              Add New Table
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Table No"
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={newTable.name}
                onChange={(e) =>
                  setNewTable({ ...newTable, name: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Hourly Rate"
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={newTable.charges}
                onChange={(e) =>
                  setNewTable({ ...newTable, charges: e.target.value })
                }
              />
              <select
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={newTable.type}
                onChange={(e) =>
                  setNewTable({ ...newTable, type: e.target.value })
                }
              >
                <option value="">Select Type</option>
                <option value="Standard">Standard</option>
                <option value="Mini">Mini</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
            <button
              onClick={handleCreateSubmit}
              className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Save Table
            </button>
          </div>
        </div>
      )}

      {/* Edit Table Modal */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 w-full max-w-md mx-auto p-6 rounded-lg shadow-lg relative border border-yellow-400">
            <button
              onClick={() => setShowEditForm(false)}
              className="absolute top-2 right-3 text-white hover:text-red-400 text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">
              Edit Table
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Table No"
                className="w-full bg-gray-700 p-2 rounded text-white"
                value={editTable.name}
                onChange={(e) =>
                  setEditTable({ ...editTable, name: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Hourly Rate"
                className="w-full bg-gray-700 p-2 rounded text-white"
                value={editTable.charges}
                onChange={(e) =>
                  setEditTable({ ...editTable, charges: e.target.value })
                }
              />
              <select
                className="w-full bg-gray-700 p-2 rounded text-white"
                value={editTable.type}
                onChange={(e) =>
                  setEditTable({ ...editTable, type: e.target.value })
                }
              >
                <option value="">Select Type</option>
                <option value="Standard">Standard</option>
                <option value="Mini">Mini</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
            <button
              onClick={handleEditSubmit}
              className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Update Table
            </button>
          </div>
        </div>
      )}

      {/* Table Display */}
      <div className="overflow-x-auto">
        <table className="min-w-[500px] w-full bg-gray-700 rounded-lg text-sm sm:text-base text-white">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Hourly Rate</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {tables.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-400 py-10 italic"
                >
                  No tables available. Click <strong>"Create New"</strong> to
                  add one!
                </td>
              </tr>
            ) : (
              tables.map((table, index) => (
                <tr
                  key={table.TableID}
                  className={`${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  } border-b border-gray-600 hover:bg-gray-600`}
                >
                  <td className="py-3 px-4">{table.TableNumber}</td>
                  <td className="py-3 px-4">{table.TableType || "-"}</td>
                  <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        table.Status === "In-Use" 
                          ? "bg-red-500" 
                          : "bg-green-500"
                      }`}>
                        {table.Status || "Unknown"}
                      </span>
                    </td>
                  <td className="py-3 px-4">{table.HourlyRate}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => {
                        setEditTable({
                          id: table.TableID,
                          name: table.TableNumber,
                          type: table.TableType,
                          charges: table.HourlyRate,
                        });
                        setShowEditForm(true);
                      }}
                      className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      <FaEdit />
                      Edit
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

export default TableManagement;