import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PlayersSection from "./PlayersSection";
import SupplierSection from "./SupplierSection";
import JournalSection from "./JournalSection";
import Canteen from "./Canteen";
import Inventory from "./Inventory";
import GameHistory from "./GameHistory";
import User from "./User";
import TableManagement from "./TableManagment";
import BookTable from "./BookTable";

import {
  FaThLarge,
  FaUsers,
  FaTable,
  FaBoxOpen,
  FaClipboardList,
  FaUtensils,
  FaBoxes,
  FaUserCog,
  FaHistory,
  FaChevronCircleRight,
  FaChevronCircleLeft,
  FaCalendarCheck,
  FaSignOutAlt,
} from "react-icons/fa";

import axios from "axios";

const menuItems = [
  { label: "Dashboard", icon: <FaThLarge /> },
  { label: "Tables", icon: <FaTable /> },
  { label: "Players", icon: <FaUsers /> },
  { label: "Supplier", icon: <FaBoxOpen /> },
  { label: "Journal", icon: <FaClipboardList /> },
  { label: "Canteen", icon: <FaUtensils /> },
  { label: "Inventory", icon: <FaBoxes /> },
  { label: "Users", icon: <FaUserCog /> },
  { label: "Game History", icon: <FaHistory /> },
  { label: "Book Table", icon: <FaCalendarCheck /> },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check session first
    axios
      .get("http://localhost:5000/api/checkSession", {
        withCredentials: true,
      })
      .then((res) => {
        if (!res.data.valid) {
          navigate("/"); // redirect if session is invalid
        } else {
          // If session is valid, fetch dashboard stats
          fetchDashboardStats();
        }
      })
      .catch((err) => {
        console.error("Session check failed:", err);
        navigate("/");
      });
  }, []);

  const fetchDashboardStats = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/admin/getDashboardStats", {
        withCredentials: true,
      })
      .then((response) => {
        setDashboardStats(response.data.stats);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard stats:", err);
        setError("Failed to load dashboard data");
        setLoading(false);
      });
  };

  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [tables, setTables] = useState([]); // for storing table list
  const [showCreateForm, setShowCreateForm] = useState(false); // for toggling create form
  const [newTable, setNewTable] = useState({ type: "", name: "", charges: "" }); // for new table input

  // Collapse sidebar by default on small screens
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (activeMenu === "Tables") {
      axios
        .get("http://localhost:5000/api/admin/getTable")
        .then((response) => {
          setTables(response.data.tables); // assuming the API returns an array
        })
        .catch((error) => {
          console.error("Failed to fetch tables:", error);
        });
    }
  }, [activeMenu]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Make API call to logout (clear sessions on server)
      axios
        .post("http://localhost:5000/api/logout", {}, { withCredentials: true })
        .then(() => {
          // Clear client-side sessions and redirect
          navigate("/");
        })
        .catch((err) => {
          console.error("Logout failed:", err);
          navigate("/"); // Still redirect even if logout API fails
        });
    }
  };

  // Dashboard cards data mapped from API response
  const dashboardCards = dashboardStats
    ? [
        { title: "Tables", count: dashboardStats.tableCount },
        { title: "Players", count: dashboardStats.playerCount },
        { title: "Supplier", count: dashboardStats.supplierCount },
        { title: "Journal Income", count: dashboardStats.incomeCount },
        { title: "Journal Expense", count: dashboardStats.expenseCount },
        { title: "Cafe Sales", count: dashboardStats.cafeSalesCount },
        { title: "Users", count: dashboardStats.userCount },
        { title: "Games Played", count: dashboardStats.totalGamesPlayed },
      ]
    : [];

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-gray-800 border-r border-gray-700 p-4 transition-all duration-300 overflow-y-auto`}
      >
        {/* Toggle Button */}
        <div className="flex justify-between gap-1 items-center mb-6">
          <div className="flex items-center gap-2">
            <img src="hero5.jpg" alt="Logo" className="w-8 h-8 rounded-full" />
            {!collapsed && (
              <span className="text-2xl font-bold">Snooker Club</span>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:text-green-500"
          >
            {collapsed ? <FaChevronCircleRight /> : <FaChevronCircleLeft />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition ${
                activeMenu === item.label ? "bg-green-600" : ""
              }`}
              onClick={() => setActiveMenu(item.label)}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex flex-row justify-between mb-4">
          <h1 className="text-3xl font-bold mb-6">{activeMenu}</h1>
          <div>
            <button
              onClick={handleLogout}
              className="bg-green-600 flex text-white p-3 text-lg font-semibold hover:bg-red-500 rounded-lg"
            >
              Logout <FaSignOutAlt className="mt-[.38rem] ml-2" />
            </button>
          </div>
        </div>

        {/* Dashboard Cards */}
        {activeMenu === "Dashboard" && (
          <>
            {loading ? (
              <div className="text-center py-10">Loading dashboard data...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">{error}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dashboardCards.map((card) => (
                  <div
                    key={card.title}
                    className="bg-gray-800 rounded-xl p-4 shadow text-left"
                  >
                    <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                    <p className="text-3xl font-bold text-green-400">
                      {card.count}
                    </p>
                    <button className="mt-2 text-sm text-green-300 hover:underline">
                      View
                    </button>
                  </div>
                ))}
                {/* Additional stats cards */}
                {dashboardStats && (
                  <>
                    <div className="bg-gray-800 rounded-xl p-4 shadow text-left">
                      <h2 className="text-xl font-semibold mb-2">
                        Total Cafe Revenue
                      </h2>
                      <p className="text-3xl font-bold text-green-400">
                        {dashboardStats.totalCafeRevenue}
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-4 shadow text-left">
                      <h2 className="text-xl font-semibold mb-2">
                        Total Game Revenue
                      </h2>
                      <p className="text-3xl font-bold text-green-400">
                        {dashboardStats.totalGameRevenue}
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-4 shadow text-left">
                      <h2 className="text-xl font-semibold mb-2">Net Profit</h2>
                      <p className="text-3xl font-bold text-green-400">
                        {dashboardStats.netProfit}
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        )}
        {/* Journal Section */}
        {activeMenu === "Journal" && <JournalSection />}
        {/* Tables Section */}
        {activeMenu === "Tables" && <TableManagement />}

        {/* Players Section */}
        {activeMenu === "Players" && <PlayersSection />}
        {/* Supplier Section */}
        {activeMenu === "Supplier" && <SupplierSection />}
        {/* Canteen Section */}
        {activeMenu === "Canteen" && <Canteen />}
        {/* Inventory Section */}
        {activeMenu === "Inventory" && <Inventory />}
        {/* Users Section */}
        {activeMenu === "Users" && <User />}
        {/* Game History Section */}
        {activeMenu === "Game History" && <GameHistory />}
        {/* BookTable Section */}
        {activeMenu === "Book Table" && <BookTable />}
      </main>
    </div>
  );
};

export default AdminDashboard;
