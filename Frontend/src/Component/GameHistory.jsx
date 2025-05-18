import React, { useState, useEffect } from "react";
import axios from "axios";

const GameHistory = () => {
  // Load persisted summaries from sessionStorage
  const [summaries, setSummaries] = useState(() => {
    const saved = sessionStorage.getItem("game_summaries");
    return saved ? JSON.parse(saved) : [];
  });
  const [gameHistories, setGameHistories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [players, setPlayers] = useState([]);
  const [playerSuggestions, setPlayerSuggestions] = useState([]);
  const [focusedInput, setFocusedInput] = useState("");
  const [availableTables, setAvailableTables] = useState([]);
  const [formData, setFormData] = useState({
    table: "",
    player1: "",
    player2: "",
    // startTime: "",
    hourlyRate: "",
    notes: "",
  });

  const handlePlayerInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFocusedInput(field);

    if (value.trim()) {
      // Search by both PlayerID and FullName
      const filtered = players.filter(
        (player) =>
          player.PlayerID.toString().includes(value) ||
          player.FullName.toLowerCase().includes(value.toLowerCase())
      );
      setPlayerSuggestions(filtered);
    } else {
      setPlayerSuggestions([]);
    }
  };

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

  const fetchAvailableTables = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/availableTable"
      );
      setAvailableTables(response.data.results);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching available tables:", error);
    }
  };

  const handlePlayerSelect = (player) => {
    setFormData((prev) => ({
      ...prev,
      [focusedInput]: player.PlayerID, // Store the PlayerID
    }));
    setPlayerSuggestions([]);
    setFocusedInput("");
  };
  // Persist summaries whenever they change
  useEffect(() => {
    sessionStorage.setItem("game_summaries", JSON.stringify(summaries));
  }, [summaries]);

  // Auto-update elapsedSeconds every second for running summaries
  useEffect(() => {
    const timer = setInterval(() => {
      setSummaries((prev) =>
        prev.map((s) =>
          s.isRunning ? { ...s, elapsedSeconds: s.elapsedSeconds + 1 } : s
        )
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  const handleSubmit = async () => {
    // console.log("formData:", formData);
    // console.log(typeof formData.hourlyRate);
    // console.log("HEHE");

    if (
      !formData.table ||
      !formData.player1 ||
      !formData.player2 ||
      !formData.hourlyRate
    ) {
      alert("Please fill all required fields");
      return;
    }
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0];
    // console.log(formattedTime);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/gameHistoryFirstForm",
        {
          table: formData.table,
          player1: formData.player1,
          player2: formData.player2,
          startTime: formattedTime,
          hourlyRate: parseFloat(formData.hourlyRate),
          notes: formData.notes || "",
        }
      );

      const newSummary = {
        table: formData.table,
        startTime: now.toISOString(),
        hourlyRate: parseFloat(formData.hourlyRate),
        isRunning: true,
        elapsedSeconds: 0,
        imageUrl: "hero1.jpg",
        endTime: null,
      };

      setSummaries((prev) => [...prev, newSummary]);
      // console.log("Updated summaries:", summaries);
      await fetchGameHistories();

      setShowForm(false);
      setFormData({
        table: "",
        player1: "",
        player2: "",
        // startTime: "",
        hourlyRate: "",
        notes: "",
      });

      alert(response.data.message);
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to submit form.");
    }
  };

  const fetchGameHistories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/gameHistoryViewTable"
      );
      const data = res.data.results;

      const parseTimeToSeconds = (timeStr) => {
        if (!timeStr) return null;
        const [h, m, s] = timeStr.split(":").map(Number);
        return h * 3600 + m * 60 + s;
      };

      const formatted = data.map((item) => {
        const startSec = parseTimeToSeconds(item.StartTime);
        const endSec = parseTimeToSeconds(item.EndTime);
        let playtime = "--";

        if (startSec !== null && endSec !== null && endSec >= startSec) {
          const diff = endSec - startSec;
          const hrs = Math.floor(diff / 3600);
          const mins = Math.floor((diff % 3600) / 60);
          const secs = diff % 60;
          playtime = `${hrs}h ${mins}m ${secs}s`;
        }

        return {
          id: item.GameID,
          table: item.TableID,
          date: new Date(item.date).toLocaleDateString(),
          player1: item.Player1ID,
          player2: item.Player2ID,
          checkin: item.StartTime,
          checkout: item.EndTime || "--",
          playtime,
          gamebill: item.TotalAmount ? `${item.TotalAmount} AFN` : "--",
          canteenbill: item.TotalCafeSales
            ? `${item.TotalCafeSales} AFN`
            : "--",
          totalbill: item.GrandTotal ? `${item.GrandTotal} AFN` : "--",
        };
      });

      setGameHistories(formatted);
    } catch (error) {
      console.error("Failed to fetch game history:", error);
    }
  };
  useEffect(() => {
    fetchGameHistories();
    fetchPlayers();
    fetchAvailableTables();
  }, []);

  const stopTimer = async (index) => {
    const end = new Date();
    const summary = summaries[index];

    const updated = summaries.map((s, i) =>
      i === index
        ? {
            ...s,
            isRunning: false,
            endTime: end.toISOString(),
          }
        : s
    );
    setSummaries(updated);

    try {
      await axios.post(
        "http://localhost:5000/api/admin/gameHistorySecondForm",
        {
          table: summary.table,
          EndTime: end.toTimeString().split(" ")[0],
          TotalAmount: parseFloat(
            ((summary.hourlyRate * summary.elapsedSeconds) / 3600).toFixed(2)
          ),
        }
      );
      alert("Game saved successfully");
      await fetchGameHistories();
    } catch (error) {
      console.error(
        "Failed to submit stop data:",
        error.response?.data || error.message
      );
      alert("Failed to submit game stop data.");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const closeCard = (index) => {
    setSummaries((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl text-white">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Game History</h2>
        <button
          className="mb-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          onClick={() => setShowForm(true)}
        >
          Add Game Record
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-700 p-6 rounded-lg w-full max-w-lg relative">
            <button
              className="absolute top-2 right-3 text-white text-2xl"
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>
            <h3 className="text-xl mb-4">New Game Record</h3>
            <div className="space-y-3">
              <select
              className="w-full bg-gray-600 p-2 rounded"
              value={formData.table}
              onChange={(e) =>
                setFormData({ ...formData, table: e.target.value })
              }
            >
              <option value="">Select Table</option>
              {availableTables.map((table) => (
                <option key={table.TableID} value={table.TableID}>
                  {`Table ${table.TableNumber}`}
                </option>
              ))}
            </select>
              {/* Player 1 */}
              <div className="relative">
                <input
                  type="text"
                  name="player1"
                  value={formData.player1}
                  onChange={(e) =>
                    handlePlayerInputChange("player1", e.target.value)
                  }
                  placeholder="Search Player 1 by ID or Name"
                  className="w-full bg-gray-600 p-2 rounded"
                  autoComplete="off"
                />
                {focusedInput === "player1" && playerSuggestions.length > 0 && (
                  <div className="absolute z-10 bg-gray-700 text-white border border-gray-600 w-full mt-1 rounded shadow-lg max-h-60 overflow-y-auto">
                    {playerSuggestions.map((player) => (
                      <div
                        key={player.PlayerID}
                        className="p-2 hover:bg-gray-600 cursor-pointer"
                        onClick={() => handlePlayerSelect(player)}
                      >
                        {player.PlayerID} - {player.FullName} ({player.Phone})
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Player 2 */}
              <div className="relative">
                <input
                  type="text"
                  name="player2"
                  value={formData.player2}
                  onChange={(e) =>
                    handlePlayerInputChange("player2", e.target.value)
                  }
                  placeholder="Search Player 2 by ID or Name"
                  className="w-full bg-gray-600 p-2 rounded"
                  autoComplete="off"
                />
                {focusedInput === "player2" && playerSuggestions.length > 0 && (
                  <div className="absolute z-10 bg-gray-700 text-white border border-gray-600 w-full mt-1 rounded shadow-lg max-h-60 overflow-y-auto">
                    {playerSuggestions.map((player) => (
                      <div
                        key={player.PlayerID}
                        className="p-2 hover:bg-gray-600 cursor-pointer"
                        onClick={() => handlePlayerSelect(player)}
                      >
                        {player.PlayerID} - {player.FullName} ({player.Phone})
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="number"
                placeholder="Hourly Rate"
                className="w-full bg-gray-600 p-2 rounded"
                value={formData.hourlyRate}
                onChange={(e) =>
                  setFormData({ ...formData, hourlyRate: e.target.value })
                }
              />
              <textarea
                placeholder="Notes"
                className="w-full bg-gray-600 p-2 rounded"
                rows="3"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
              <button
                className="w-full bg-green-500 hover:bg-green-600 p-2 rounded mt-3"
                onClick={handleSubmit}
              >
                Submit Game Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Summary Cards */}
      {summaries.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {summaries.map((item, idx) => (
            <div
              key={idx}
              className="relative p-4 rounded-lg text-white shadow-md h-72 flex flex-col justify-between bg-cover bg-center"
              style={{
                backgroundImage: `url(${item.imageUrl})`,
                backgroundBlendMode: "overlay",
                backgroundColor: "rgba(0,0,0,0.6)",
              }}
            >
              {item.isRunning ? null : (
                <button
                  className="absolute top-2 right-3 text-white hover:text-red-600 text-2xl"
                  onClick={() => closeCard(idx)}
                >
                  &times;
                </button>
              )}
              <div className="text-center font-bold text-lg">{item.table}</div>
              <div className="text-center text-md">
                Start: {new Date(item.startTime).toLocaleTimeString()}
                {item.endTime && (
                  <div>End: {new Date(item.endTime).toLocaleTimeString()}</div>
                )}
              </div>
              <hr className="border-gray-400 my-2" />
              <div className="flex justify-between text-md">
                <div>⏱ {formatTime(item.elapsedSeconds)}</div>
                <div>
                  💸{" "}
                  {((item.hourlyRate * item.elapsedSeconds) / 3600).toFixed(2)}{" "}
                  AFN
                </div>
              </div>
              {item.isRunning ? (
                <button
                  onClick={() => stopTimer(idx)}
                  className="mx-auto mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                >
                  Stop
                </button>
              ) : (
                <div className="flex justify-between mt-4 text-md font-semibold">
                  <span>Played: {formatTime(item.elapsedSeconds)}</span>
                  <span>
                    Total:{" "}
                    {((item.hourlyRate * item.elapsedSeconds) / 3600).toFixed(
                      2
                    )}{" "}
                    AFN
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Game History Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-gray-100 border-collapse text-center">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2">Table</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Players</th>
              <th className="px-4 py-2">Check-in/Out</th>
              <th className="px-4 py-2">Playtime</th>
              <th className="px-4 py-2">Game Bill</th>
              <th className="px-4 py-2">Canteen Bill</th>
              <th className="px-4 py-2">Total Bill</th>
            </tr>
          </thead>
          <tbody>
            {gameHistories.map((game, index) => (
              <tr
                key={game.id}
                className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
              >
                <td className="px-4 py-2">{game.table}</td>
                <td className="px-4 py-2">{game.date}</td>
                <td className="px-4 py-2">
                  {players.find((p) => p.PlayerID === game.player1)?.FullName ||
                    game.player1}{" "}
                  vs {" "}
                  {players.find((p) => p.PlayerID === game.player2)?.FullName ||
                    game.player2}
                </td>
                <td className="px-4 py-2">
                  {game.checkin} / {game.checkout}
                </td>
                <td className="px-4 py-2">{game.playtime}</td>
                <td className="px-4 py-2">{game.gamebill}</td>
                <td className="px-4 py-2">{game.canteenbill}</td>
                <td className="px-4 py-2">{game.totalbill}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameHistory;
