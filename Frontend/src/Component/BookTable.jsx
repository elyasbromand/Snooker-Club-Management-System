import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const BookTable = () => {
  const [bookings, setBookings] = useState([]);
  const [tables, setTables] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    table: "",
    duration: "",
    phone: "",
    playerId: "",
  });

  // Fetch all bookings and tables on component mount
  useEffect(() => {
    fetchBookings();
    fetchTables();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/getAllBooking");
      setBookings(response.data.results);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      alert("Failed to fetch bookings");
    }
  };

  const fetchTables = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/getTable");
      setTables(response.data.tables); // Now showing ALL tables
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      date: "",
      time: "",
      table: "",
      duration: "",
      phone: "",
      playerId: "",
    });
    setShowForm(false);
    setEditMode(false);
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.date ||
      !formData.time ||
      !formData.table ||
      !formData.duration ||
      !formData.phone ||
      !formData.playerId
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (editMode) {
        await axios.patch(`http://localhost:5000/api/admin/updateBooking/${editingId}`, formData);
        alert("Record Updated Successfully");
      } else {
        await axios.post("http://localhost:5000/api/admin/createBooking", formData);
      }
      fetchBookings();
      resetForm();
    } catch (error) {
      console.error("Error saving booking:", error);
      alert(error.response?.data?.message || "Failed to save booking");
    }
  };

  const handleEdit = (booking) => {
    setEditMode(true);
    setEditingId(booking.BookingID);
    setFormData({
      name: booking.Name,
      date: booking.Date.split('T')[0],
      time: booking.Time,
      table: booking.TableID,
      duration: booking.DurationHours,
      phone: booking.Phone,
      playerId: booking.PlayerID,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/deleteBooking/${id}`);
        fetchBookings();
      } catch (error) {
        console.error("Error deleting booking:", error);
        alert("Failed to delete booking");
      }
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Book Table</h2>
        <button
          className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm sm:text-base"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <FaPlus className="mr-2" />
          Add Booking
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full max-w-md p-6 rounded-lg bg-gray-800 relative shadow-lg">
            <button
              onClick={resetForm}
              className="absolute top-2 right-3 text-white text-xl hover:text-red-500"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Booking" : "Add New Booking"}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="date"
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
              <input
                type="time"
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
              <select
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.table}
                onChange={(e) => setFormData({ ...formData, table: e.target.value })}
              >
                <option value="">Select Table</option>
                {tables.map((table) => (
                  <option 
                    key={table.TableID} 
                    value={table.TableID}
                    className={table.Status === "In-Use" ? "text-red-400" : ""}
                  >
                    {table.TableType} - #{table.TableNumber} 
                    (₹{table.HourlyRate}/hr) 
                    {table.Status === "In-Use" ? " (Booked)" : ""}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Duration (hours)"
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <input
                type="number"
                placeholder="Player ID"
                className="w-full bg-gray-600 p-2 rounded text-white"
                value={formData.playerId}
                onChange={(e) => setFormData({ ...formData, playerId: e.target.value })}
              />
              <button
                className={`w-full ${
                  editMode ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-500 hover:bg-green-600"
                } text-white px-4 py-2 rounded mt-4`}
                onClick={handleSubmit}
              >
                {editMode ? "Update Booking" : "Save Booking"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 rounded-lg text-sm sm:text-base text-white">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Time</th>
              <th className="py-3 px-4 text-left">Table</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Duration</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Player ID</th>
              <th className="py-3 px-4 text-left">Created At</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center text-gray-400 py-10 italic">
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => {
                const tableDetails = tables.find(t => t.TableID === booking.TableID) || {};
                
                return (
                  <tr
                    key={booking.BookingID}
                    className={`border-b border-gray-600 hover:bg-gray-600 ${
                      tableDetails.Status === "In-Use" ? "bg-gray-900" : ""
                    }`}
                  >
                    <td className="py-3 px-4">{booking.BookingID}</td>
                    <td className="py-3 px-4">{booking.Name}</td>
                    <td className="py-3 px-4">{new Date(booking.Date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{booking.Time}</td>
                    <td className="py-3 px-4">
                      {tableDetails.TableType ? `${tableDetails.TableType} #${tableDetails.TableNumber}` : 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        tableDetails.Status === "In-Use" 
                          ? "bg-red-500" 
                          : "bg-green-500"
                      }`}>
                        {tableDetails.Status || "Unknown"}
                      </span>
                    </td>
                    <td className="py-3 px-4">{booking.DurationHours} hours</td>
                    <td className="py-3 px-4">{booking.Phone}</td>
                    <td className="py-3 px-4">{booking.PlayerID}</td>
                    <td className="py-3 px-4">
                      {new Date(booking.CreatedAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(booking)}
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(booking.BookingID)}
                        className="text-red-400 hover:text-red-300"
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

export default BookTable;