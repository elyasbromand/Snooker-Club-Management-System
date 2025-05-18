import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const [formData, setFormData] = useState({
    itemName: "",
    supplierId: "",
    category: "",
    quantity: "",
    costPerUnit: "",
    salePrice: "",
  });
  const [suggestedSuppliers, setSuggestedSuppliers] = useState([]);

  const fetchInventoryRecords = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/showInventoryRecords"
      );
      setItems(response.data);
      // console.log(response.data);
      setFilteredItems(response.data); // initialize filtered list
    } catch (error) {
      console.error("Error fetching Inventory records:", error);
      alert("Failed to fetch Inventory records.");
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) =>
        item.ItemName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery, items]);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/getAllSuppliers"
      );
      setSuppliers(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      alert("Failed to fetch suppliers.");
    }
  };

  useEffect(() => {
    fetchInventoryRecords();
    fetchSuppliers();
  }, []);

  const handleSubmit = async () => {
    const { itemName, supplierId, category, quantity, costPerUnit, salePrice } =
      formData;

    if (
      !itemName ||
      !supplierId ||
      !category ||
      !quantity ||
      !costPerUnit ||
      !salePrice
    ) {
      alert("All fields are required.");
      return;
    }

    if (isNaN(quantity) || isNaN(costPerUnit) || isNaN(salePrice)) {
      alert("Quantity, Cost per Unit, and Sale Price must be numeric.");
      return;
    }

    try {
      if (isEditing) {
        await axios.patch(
          `http://localhost:5000/api/admin/editInventory/${editItemId}`,
          {
            itemName,
            supplierId,
            category,
            quantity,
            costPerUnit,
            salePrice,
          }
        );
        alert("Item updated successfully");
      } else {
        await axios.post(
          "http://localhost:5000/api/admin/createInventoryRecord",
          {
            itemName,
            supplierId,
            category,
            quantity,
            costPerUnit,
            salePrice,
          }
        );
        alert("Item created successfully");
      }
      await fetchInventoryRecords();
    } catch (error) {
      console.error("Error saving inventory record:", error);
      alert("Failed to save record.");
    }

    setFormData({
      itemName: "",
      supplierId: "",
      category: "",
      quantity: "",
      costPerUnit: "",
      salePrice: "",
    });
    setIsEditing(false);
    setEditItemId(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setFormData({
      itemName: item.ItemName,
      supplierId: item.SupplierID,
      category: item.Category,
      quantity: item.OriginalQuantity,
      costPerUnit: item.CostPerUnit,
      salePrice: item.salePrice,
    });
    setEditItemId(item.ItemID);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/deleteInventory/${id}`
      );
      alert("Item deleted successfully");
      await fetchInventoryRecords();
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      alert("Failed to delete item");
    }
  };

  // Handle input changes for form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle supplier suggestions based on the input
  const handleSupplierSearch = (e) => {
    const query = e.target.value;
    setFormData((prevData) => ({ ...prevData, supplierId: query }));

    if (query) {
      // Match by ID or name
      const filteredSuppliers = suppliers.filter(
        (supplier) =>
          supplier.SupplierID.toString().includes(query) ||
          supplier.Name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestedSuppliers(filteredSuppliers);
    } else {
      setSuggestedSuppliers([]);
    }
  };
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Inventory</h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by item name"
            className="bg-gray-700 text-white px-3 py-2 rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button
            className="bg-green-500 flex gap-1 hover:bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => {
              setFormData({
                itemName: "",
                supplierId: "",
                category: "",
                quantity: "",
                costPerUnit: "",
                salePrice: "",
              });
              setIsEditing(false);
              setEditItemId(null);
              setShowForm(true);
            }}
          >
            <FaPlus className="mt-1" /> Add Item
          </button>
        </div>
      </div>
      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`bg-gray-800 w-full max-w-md p-6 rounded-lg shadow-lg relative `}
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-white hover:text-red-400 text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center text-white">
              {isEditing ? "Edit Item" : "Add New Item"}
            </h3>
            <div className="space-y-4">
              {[{ key: "itemName", label: "Item Name" }].map(
                ({ key, label }) => (
                  <div key={key}>
                    <input
                      type="text"
                      placeholder={label}
                      className="w-full bg-gray-700 p-2 rounded text-white"
                      value={formData[key]}
                      onChange={handleChange}
                      name={key}
                    />
                  </div>
                )
              )}

              {/* Supplier ID Input with Suggestions */}
              <div>
                <input
                  type="text"
                  placeholder="Search Supplier by ID or Name"
                  className="w-full bg-gray-700 p-2 rounded text-white"
                  value={formData.supplierId}
                  onChange={handleSupplierSearch}
                />
                {suggestedSuppliers.length > 0 && (
                  <ul className="bg-gray-600 text-white mt-2 rounded-lg shadow-lg max-h-48 overflow-y-scroll">
                    {suggestedSuppliers.map((supplier) => (
                      <li
                        key={supplier.SupplierID}
                        className="p-2 hover:bg-gray-500 cursor-pointer"
                        onClick={() => {
                          setFormData((prevData) => ({
                            ...prevData,
                            supplierId: supplier.SupplierID,
                          }));
                          setSuggestedSuppliers([]);
                        }}
                      >
                        {supplier.SupplierID} - {supplier.Name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Category Dropdown */}
              <div>
                <select
                  name="category"
                  className="w-full bg-gray-700 p-2 rounded text-white"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="Cafe">Cafe</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>

              {[
                { key: "quantity", label: "Quantity" },
                { key: "costPerUnit", label: "Cost per Unit" },
                { key: "salePrice", label: "Sale Price" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <input
                    type="number"
                    placeholder={label}
                    className="w-full bg-gray-700 p-2 rounded text-white"
                    value={formData[key]}
                    onChange={handleChange}
                    name={key}
                  />
                </div>
              ))}

              <button
                onClick={handleSubmit}
                className={`w-full px-4 py-2 rounded mt-4 text-white ${
                  isEditing
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isEditing ? "Update Item" : "Save Item"}
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
              <th className="py-3 px-4 text-left">Item ID</th>
              <th className="py-3 px-4 text-left">Item Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">In Stock</th>
              <th className="py-3 px-4 text-left">Total Sold</th>
              <th className="py-3 px-4 text-left">Remaining</th>
              <th className="py-3 px-4 text-left">Cost</th>
              <th className="py-3 px-4 text-left">Sale</th>
              <th className="py-3 px-4 text-left">Total Cost</th>
              <th className="py-3 px-4 text-left">Total Sale</th>
              <th className="py-3 px-4 text-left">Profit</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td
                  colSpan="13"
                  className="text-center text-gray-400 py-10 italic"
                >
                  No inventory items added. Click <strong>"Add Item"</strong> to
                  begin!
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr
                  key={item.ItemID}
                  className={`${
                    item.ItemID % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  } border-b border-gray-600 hover:bg-gray-600`}
                >
                  <td className="py-3 px-4">{item.ItemID}</td>
                  <td className="py-3 px-4">{item.ItemName}</td>
                  <td className="py-3 px-4">{item.Category}</td>
                  <td className="py-3 px-4">{item.OriginalQuantity}</td>
                  <td className="py-3 px-4">{item.TotalSold}</td>
                  <td className="py-3 px-4">{item.RemainingStock}</td>
                  <td className="py-3 px-4">{item.CostPerUnit}</td>
                  <td className="py-3 px-4">{item.salePrice}</td>
                  <td className="py-3 px-4">{item.TotalInventoryCost}</td>
                  <td className="py-3 px-4">{item.TotalRevenue}</td>
                  <td className="py-3 px-4">{item.TotalProfit}</td>
                  <td className="py-3 px-4">
                    {new Date(item.LastUpdated).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex items-center gap-1 text-yellow-400 hover:text-yellow-600  py-1 rounded text-md"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.ItemID)}
                      className="flex items-center gap-1 text-red-500 hover:text-red-600  py-1 rounded text-md"
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

export default Inventory;
