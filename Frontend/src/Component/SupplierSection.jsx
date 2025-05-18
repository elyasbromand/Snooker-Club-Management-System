import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaTimes, FaEdit, FaTrash } from "react-icons/fa";

const SupplierSection = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    type: "",
  });
  const [editSupplier, setEditSupplier] = useState(null);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/getAllSuppliers"
      );
      const formattedData = response.data.map((supplier) => ({
        id: supplier.SupplierID,
        name: supplier.Name,
        email: supplier.email,
        phoneNumber: supplier.ContactInfo,
        address: supplier.Address,
        type: supplier.Type,
        updatedAt: new Date(supplier.Date).toISOString(),
      }));
      setSuppliers(formattedData);
    } catch (error) {
      console.error("Failed to fetch suppliers:", error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSubmit = async () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.address.trim() ||
      !formData.type
    ) {
      alert("All fields are required.");
      return;
    }
    if (!formData.email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d+$/.test(formData.phoneNumber)) {
      alert("Phone number must be numeric.");
      return;
    }

    try {
      setIsSubmitting(true);
      if (editSupplier) {
        await axios.patch(
          `http://localhost:5000/api/admin/editSupplier/${editSupplier.id}`,
          {
            Name: formData.name,
            Email: formData.email,
            ContactInfo: formData.phoneNumber,
            Address: formData.address,
            Type: formData.type,
          }
        );
        alert("Supplier updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/admin/createSupplier", {
          Name: formData.name,
          Email: formData.email,
          ContactInfo: formData.phoneNumber,
          Address: formData.address,
          Type: formData.type,
        });
        alert("Supplier saved successfully!");
      }

      await fetchSuppliers();
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        type: "",
      });
      setShowForm(false);
      setEditSupplier(null);
    } catch (error) {
      console.error("Error saving supplier:", error);
      alert(
        `Failed to save supplier: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (supplier) => {
    setFormData({
      name: supplier.name,
      email: supplier.email,
      phoneNumber: supplier.phoneNumber,
      address: supplier.address,
      type: supplier.type,
    });
    setEditSupplier(supplier);
    setShowForm(true);
  };

  const handleDelete = async (supplierId) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/admin/deleteSupplier/${supplierId}`
        );
        alert("Supplier deleted successfully!");
        fetchSuppliers();
      } catch (error) {
        console.error("Error deleting supplier:", error);
        alert(
          `Failed to delete supplier: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Suppliers</h2>
        <button
          onClick={() => {
            setEditSupplier(null);
            setFormData({
              name: "",
              email: "",
              phoneNumber: "",
              address: "",
              type: "",
            });
            setShowForm(true);
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Add Supplier
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div
            className={`bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative ${
              editSupplier ? "" : ""
            }`}
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-white hover:text-red-400 text-xl"
            >
              <FaTimes />
            </button>
            <h3 className="text-xl font-bold mb-4 text-white">
              {editSupplier ? "Edit Supplier" : "Add New Supplier"}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-gray-700 p-2 rounded text-white"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-gray-700 p-2 rounded text-white"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full bg-gray-700 p-2 rounded text-white"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full bg-gray-700 p-2 rounded text-white"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              <select
                className="w-full bg-gray-700 p-2 rounded text-white"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="">Select Type</option>
                <option value="Cafe">Cafe</option>
                <option value="Club">Club</option>
              </select>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full px-4 py-2 rounded text-white font-semibold ${
                  editSupplier
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isSubmitting
                  ? "Saving..."
                  : editSupplier
                  ? "Update Supplier"
                  : "Save Supplier"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Supplier Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full text-sm text-left text-white bg-gray-700 rounded-lg">
          <thead className="bg-gray-600">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Address</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Updated</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-10 text-gray-400 italic"
                >
                  No suppliers yet. Click <strong>Add Supplier</strong> to
                  begin!
                </td>
              </tr>
            ) : (
              suppliers.map((supplier, index) => (
                <tr
                  key={supplier.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  } hover:bg-gray-600`}
                >
                  <td className="py-3 px-4">{supplier.id}</td>
                  <td className="py-3 px-4">{supplier.name}</td>
                  <td className="py-3 px-4">{supplier.email}</td>
                  <td className="py-3 px-4">{supplier.phoneNumber}</td>
                  <td className="py-3 px-4">{supplier.address}</td>
                  <td className="py-3 px-4">{supplier.type}</td>
                  <td className="py-3 px-4">
                    {new Date(supplier.updatedAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(supplier)}
                      className="text-yellow-400 hover:text-yellow-500"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(supplier.id)}
                      className="text-red-500 hover:text-red-600"
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

export default SupplierSection;
