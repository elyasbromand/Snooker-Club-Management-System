import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const Canteen = () => {
  const [sales, setSales] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [formData, setFormData] = useState({
    itemId: "",
    quantity: "",
    soldBy: "",
    tableID: "",
  });
  const [itemSearchTerm, setItemSearchTerm] = useState("");
  const [showItemSuggestions, setShowItemSuggestions] = useState(false);
  const [inventoryItems, setInventoryItems] = useState([]); // State for inventory items
  const [filteredItems, setFilteredItems] = useState([]); // State for filtered items

  // Fetch inventory records
  const fetchInventoryRecords = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/showInventoryRecords"
      );
      setInventoryItems(response.data);
      setFilteredItems(response.data); // Initialize filtered list
    } catch (error) {
      console.error("Error fetching Inventory records:", error);
      alert("Failed to fetch Inventory records.");
    }
  };

  const fetchCafeRecords = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/showCafeRecords"
      );
      setSales(response.data);
    } catch (error) {
      console.error("Error fetching cafe records:", error);
      alert("Failed to fetch cafe records.");
    }
  };

  useEffect(() => {
    fetchCafeRecords();
    fetchInventoryRecords(); // Fetch inventory items when component mounts
  }, []);

  // Filter items based on search term
  useEffect(() => {
    if (itemSearchTerm.trim()) {
      const filtered = inventoryItems.filter(
        (item) =>
          item.ItemID.toString().includes(itemSearchTerm) ||
          item.ItemName.toLowerCase().includes(itemSearchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(inventoryItems);
    }
  }, [itemSearchTerm, inventoryItems]);

  const handleSubmit = async () => {
    const { itemId, quantity, soldBy, tableID } = formData;

    if (!itemId || !quantity || !soldBy || !tableID) {
      alert("All fields are required.");
      return;
    }

    try {
      if (selectedSale) {
        // Update existing record
        await axios.patch(
          `http://localhost:5000/api/admin/editCanteen/${selectedSale.SaleID}`,
          {
            itemId: Number(itemId),
            quantity: Number(quantity),
            soldBy: Number(soldBy),
            tableID: Number(tableID),
          }
        );
        alert("Sale updated successfully");
      } else {
        // Create new record
        await axios.post("http://localhost:5000/api/admin/createCafeRecord", {
          itemId: Number(itemId),
          quantity: Number(quantity),
          soldBy: Number(soldBy),
          tableID: Number(tableID),
        });
        alert("Sale created successfully");
      }

      await fetchCafeRecords();
      setFormData({ itemId: "", quantity: "", soldBy: "", tableID: "" });
      setSelectedSale(null);
      setShowForm(false);
      setItemSearchTerm("");
    } catch (error) {
      console.error("Error saving record:", error);
      alert(
        `Failed to save record: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleEdit = (sale) => {
    const foundItem = inventoryItems.find(item => item.ItemID === sale.ItemID);
    setFormData({
      itemId: sale.ItemID,
      quantity: sale.Quantity,
      soldBy: sale.SoldBy,
      tableID: sale.tableID,
    });
    setItemSearchTerm(foundItem ? `${foundItem.ItemID} - ${foundItem.ItemName}` : sale.ItemID.toString());
    setSelectedSale(sale);
    setShowForm(true);
  };

  const handleDelete = async (SaleID) => {
    if (!window.confirm("Are you sure you want to delete this sale?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/deleteCanteen/${SaleID}`
      );
      alert("Sale deleted successfully");
      fetchCafeRecords();
    } catch (error) {
      console.error("Error deleting sale:", error);
      alert(
        `Failed to delete sale: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleItemSelect = (item) => {
    setFormData({ ...formData, itemId: item.ItemID });
    setItemSearchTerm(`${item.ItemID} - ${item.ItemName}`);
    setShowItemSuggestions(false);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Canteen Sales</h2>
        <button
          className="bg-green-500 flex gap-2 items-center hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setSelectedSale(null);
            setFormData({ itemId: "", quantity: "", soldBy: "", tableID: "" });
            setItemSearchTerm("");
            setShowForm(true);
          }}
        >
          <FaPlus /> Add Sale
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`bg-gray-800 ${
              selectedSale ? "" : ""
            } w-full max-w-md p-6 rounded-lg shadow-lg relative`}
          >
            <button
              className="absolute top-2 right-3 text-white hover:text-red-400 text-xl"
              onClick={() => {
                setShowForm(false);
                setSelectedSale(null);
                setFormData({
                  itemId: "",
                  quantity: "",
                  soldBy: "",
                  tableID: "",
                });
                setItemSearchTerm("");
              }}
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {selectedSale ? "Edit Sale" : "Add New Sale"}
            </h3>
            <div className="space-y-4">
              {/* Item ID Input + Suggestions */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search item by ID or name"
                  className="w-full bg-gray-600 p-2 rounded text-white"
                  value={itemSearchTerm}
                  onChange={(e) => {
                    setItemSearchTerm(e.target.value);
                    setShowItemSuggestions(true);
                  }}
                  onFocus={() => setShowItemSuggestions(true)}
                  autoComplete="off"
                />
                {showItemSuggestions && filteredItems.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-gray-700 border border-gray-600 max-h-60 overflow-y-auto z-10">
                    {filteredItems.map((item) => (
                      <div
                        key={item.ItemID}
                        className="p-2 hover:bg-gray-600 cursor-pointer"
                        onClick={() => handleItemSelect(item)}
                      >
                        {item.ItemID} - {item.ItemName} ({item.Category})
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quantity */}
              <input
                type="number"
                placeholder="Quantity"
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                min="1"
              />

              {/* Table ID */}
              <input
                type="number"
                placeholder="Table ID"
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.tableID}
                onChange={(e) =>
                  setFormData({ ...formData, tableID: e.target.value })
                }
                min="1"
              />

              {/* Sold By */}
              <select
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.soldBy}
                onChange={(e) =>
                  setFormData({ ...formData, soldBy: e.target.value })
                }
              >
                <option value="">Select Sold By</option>
                <option value="1">Admin</option>
              </select>

              {/* Submit */}
              <button
                className={`w-full text-white px-4 py-2 rounded mt-4 ${
                  selectedSale
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={handleSubmit}
              >
                {selectedSale ? "Update Sale" : "Save Sale"}
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
              <th className="py-3 px-4 text-left">Sale ID</th>
              <th className="py-3 px-4 text-left">Item ID</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Sale Date</th>
              <th className="py-3 px-4 text-left">Table</th>
              <th className="py-3 px-4 text-left">Sold By</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center text-gray-400 py-10 italic"
                >
                  No sales recorded. Click <strong>"Add Sale"</strong> to begin!
                </td>
              </tr>
            ) : (
              sales.map((sale) => {
                const item = inventoryItems.find(i => i.ItemID === sale.ItemID);
                return (
                  <tr
                    key={sale.SaleID}
                    className={`${
                      sale.SaleID % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                    } border-b border-gray-600 hover:bg-gray-600`}
                  >
                    <td className="py-3 px-4">{sale.SaleID}</td>
                    <td className="py-3 px-4">
                      {item ? `${item.ItemID} - ${item.ItemName}` : sale.ItemID}
                    </td>
                    <td className="py-3 px-4">{sale.Quantity}</td>
                    <td className="py-3 px-4">
                      {new Date(sale.SaleDate).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3 px-4">{sale.tableID}</td>
                    <td className="py-3 px-4">{sale.SoldBy}</td>
                    <td className="py-3 px-4 space-x-3">
                      <button
                        onClick={() => handleEdit(sale)}
                        className="text-yellow-400 hover:text-yellow-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(sale.SaleID)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Canteen;