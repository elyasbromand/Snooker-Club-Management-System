import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import {
  FaCalendarAlt,
  FaClipboardList,
  FaClock,
  FaFacebookF,
  FaTimes,
  FaGlobe,
  FaPhoneAlt,
  FaEdit,
  FaBullseye,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function StatCard({ title, count, icon, clickable = false, onClick }) {
  return (
    <div
      className={`bg-gradient-to-br from-green-400 to-green-900 text-white text-center rounded-lg p-6 shadow-md flex flex-col items-center justify-center gap-3 ${
        clickable ? "cursor-pointer hover:bg-green-700 transition" : ""
      }`}
      onClick={clickable ? onClick : undefined}
    >
      <div className="text-3xl text-white">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-300">{title}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
}

const PersonalDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  useEffect(() => {
    if (!location.state || !location.state.user) {
      console.log("User not logged in, redirecting...");
      navigate("/");
    }
  }, [navigate, location.state]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showUserBio, setShowUserBio] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const chartData = useMemo(() => {
    const timeAndDate = user?.personalDashboardTimeAndDate || [];
    return timeAndDate.map((item) => ({
      name: item.month,
      matches: item.matchesPlayed,
      time: item.timePlayed,
    }));
  }, [user]);

  useEffect(() => {
    fetchProfileImage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchProfileImage = async () => {
    try {
      const playerId = user?.user?.id;
      if (!playerId) return;

      const response = await axios.get(
        `http://localhost:5000/api/players/getProfile/${playerId}`,
        { responseType: "blob" }
      );

      const imageBlob = response.data;
      const imageUrl = URL.createObjectURL(imageBlob);
      setProfileImage(imageUrl);
    } catch (error) {
      console.error("Error fetching profile image:", error);
      setProfileImage(null);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const playerId = user?.user?.id;

    if (file && playerId) {
      const formData = new FormData();
      formData.append("playerId", playerId);
      formData.append("profilePicture", file);

      try {
        await axios.post(
          "http://localhost:5000/api/players/upload-profile-picture",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        alert("Photo uploaded successfully!");
        fetchProfileImage();
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload image.");
      }
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      axios
        .post("http://localhost:5000/api/logout", {}, { withCredentials: true })
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.error("Logout failed:", err);
          navigate("/");
        });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="flex items-center justify-between px-6 py-4 shadow border-b border-slate-700">
        <h1 className="text-xl font-bold">Welcome Mr. {user?.user?.fullName}</h1>
        <div className="relative" ref={dropdownRef}>
          <div className="flex flex-row gap-2">
            <div>
              <button
                onClick={handleLogout}
                className="bg-green-600 flex text-white p-2 text-md font-semibold hover:bg-red-500 rounded-lg"
              >
                Logout <FaSignOutAlt className="mt-[.38rem] ml-2" />
              </button>
            </div>
            <img
              src={profileImage || "/default-profile.png"}
              alt="user"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white object-cover"
              onClick={() => setShowDropdown(!showDropdown)}
            />
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-slate-700 shadow-xl rounded-lg p-4 z-50 text-center">
              <div className="flex flex-col items-center gap-2 relative">
                <div className="relative">
                  <img
                    src={profileImage || "/default-profile.png"}
                    alt="user"
                    className="w-20 h-20 rounded-full border-4 border-slate-600 object-cover"
                  />
                  <label
                    htmlFor="upload-image"
                    className="absolute bottom-0 right-0 cursor-pointer"
                  >
                    <FaEdit
                      className="text-white bg-indigo-600 p-1 rounded-full"
                      size={24}
                    />
                  </label>
                  <input
                    id="upload-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
                <p className="font-semibold text-lg mt-2">
                  {user?.user?.userName}
                </p>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
        <StatCard
          title="User Info"
          count="Tab to see more"
          icon={<FaClipboardList />}
          clickable
          onClick={() => setShowUserBio(true)}
        />
        <StatCard
          title="Matches"
          count={user?.user?.totalGamesPlayed || 0}
          icon={<FaBullseye />}
        />
        <StatCard
          title="Time Played"
          count={user?.user?.totalTimePlayed || 0}
          icon={<FaClock />}
        />
        <StatCard
          title="Table Booking"
          count="Book Now"
          icon={<FaCalendarAlt />}
          clickable
          onClick={() => setShowBookingForm(true)}
        />
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Match & Time Played Stats</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="name" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                borderColor: "#475569",
              }}
            />
            <Line type="monotone" dataKey="matches" stroke="#60a5fa" />
            <Line type="monotone" dataKey="time" stroke="#34d399" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {showBookingForm && (
        <BookingForm onClose={() => setShowBookingForm(false)} />
      )}

      {showUserBio && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="relative bg-gray-800 text-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <button
              onClick={() => setShowUserBio(false)}
              className="absolute top-4 right-4 text-gray-100 hover:text-white text-lg"
            >
              <FaTimes />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={profileImage || "/default-profile.png"}
                alt="User"
                className="w-16 h-16 rounded-full border-2 border-green-400"
              />
              <div>
                <h2 className="text-xl font-semibold">{user?.user?.userName}</h2>
              </div>
            </div>

            <hr className="border-gray-600 mb-4" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Full Name:</span>
                <span className="text-white">{user?.user?.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Phone Number:</span>
                <span className="text-white">{user?.user?.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Loyalty Points:</span>
                <span className="text-white">{user?.user?.loyaltyPoints}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Address:</span>
                <span className="text-white">{user?.user?.address}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-10 mx-24 py-6 border-t border-slate-700 flex flex-row sm:grid sm:grid-cols-3 justify-center items-center gap-8 text-4xl text-slate-300">
        <div className="flex justify-center items-center p-6 rounded-xl shadow-md bg-gradient-to-br from-green-400 to-green-900 text-white text-center transition hover:scale-105">
          <FaFacebookF className="hover:text-blue-500 cursor-pointer transform transition-transform hover:scale-110" />
        </div>
        <div className="flex justify-center items-center p-6 rounded-xl shadow-md bg-gradient-to-br from-green-400 to-green-900 text-white text-center transition hover:scale-105">
          <FaGlobe className="hover:text-green-700 cursor-pointer transform transition-transform hover:scale-110" />
        </div>
        <div className="flex justify-center items-center p-6 rounded-xl shadow-md bg-gradient-to-br from-green-400 to-green-900 text-white text-center transition hover:scale-105">
          <FaPhoneAlt className="hover:text-red-500 cursor-pointer transform transition-transform hover:scale-110" />
        </div>
      </footer>
    </div>
  );
};

function BookingForm({ onClose }) {
  const location = useLocation();
  const user = location.state?.user;

  const [tableId, settableId] = useState("");
  const [date, setDate] = useState("");
  const [time, settime] = useState("");
  const [duration, setDuration] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleBooking = async (event) => {
    event.preventDefault();
    if (!tableId || !date || !time || !duration || !phone) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/players/booktable", {
        playerId: user?.user?.id,
        name: user?.user?.fullName,
        tableId,
        date,
        time,
        duration,
        phone,
      });
      alert("Booking Successful");
      onClose();
    } catch (error) {
      console.error("Booking failed:", error);
      setError("Failed to book table. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 text-white p-8 rounded-lg w-full max-w-md shadow-xl relative">
        <button
          className="absolute top-2 right-3 text-white hover:text-red-500 text-2xl"
          onClick={onClose}
          type="button"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Book a Table</h2>
        <form className="space-y-4" onSubmit={handleBooking}>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600"
            required
          />
          <label>Start Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => settime(e.target.value)}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600"
            required
          />
          <label className="block mb-1">Table</label>
          <select
            value={tableId}
            onChange={(e) => settableId(e.target.value)}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600"
            required
          >
            <option value="">Select Table</option>
            {user?.availableTables?.map((tableId) => (
              <option key={tableId} value={tableId}>
                Table {tableId}
              </option>
            ))}
          </select>
          <label>Duration</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration (hrs)"
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600"
            required
          />
          <label>Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            Confirm Booking
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default PersonalDashboard;