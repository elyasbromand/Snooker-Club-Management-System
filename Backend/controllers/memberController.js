import db from "../db.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createMember = (req, res) => {
  console.log(req.body);

  const { fullName, userName, password, phone, address } = req.body;

  if (!fullName || !userName || !password || !phone || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql =
    "INSERT INTO players (FullName, Password, Phone, userName, Address) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [fullName, password, phone, userName, address],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Player Created", id: result.insertId });
    }
  );
};

export const loginMember = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const sql = "SELECT * FROM players WHERE UserName = ?";

  db.query(sql, [username], async (error, result) => {
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = result[0];

    // Simple password match
    const match = password === user.Password;

    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // First: get overall dashboard data
    const personalDashboardQuery = `
      SELECT * FROM personal_dashboard WHERE PlayerID = ?
    `;

    db.query(
      personalDashboardQuery,
      [user.PlayerID],
      (error, dashboardData) => {
        if (error) {
          console.error("Database error:", error);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (dashboardData.length === 0) {
          return res.status(404).json({ message: "Dashboard data not found" });
        }
        // console.log("Time in seconds: " + dashboardData[0].TotalTimeInSeconds)
        const totalSeconds = dashboardData[0].TotalTimeInSeconds;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        const formattedTime =
          (hours > 0 ? `${hours} hr ` : "") +
          (minutes > 0 ? `${minutes} min` : hours === 0 ? "0 min" : "");

        //console.log("Dashboard [0]: " + dashboardData[0].TotalTimeInSeconds);

        const userData = {
          id: dashboardData[0].PlayerID,
          fullName: dashboardData[0].FullName,
          phone: dashboardData[0].Phone,
          loyaltyPoints: dashboardData[0].LoyaltyPoints,
          address: dashboardData[0].Address,
          userName: dashboardData[0].UserName,
          totalGamesPlayed: dashboardData[0].TotalGamesPlayed,
          totalTimePlayed: formattedTime,
        };

        // Second: get monthly breakdown from personal_dashboard_time_date
        const monthlyQuery = `
        SELECT 
          YEAR(date) AS year,
          MONTH(date) AS month,
          SUM(MatchesPlayed) AS totalMatches,
          SUM(TotalTimeInSeconds) AS totalTimeInSeconds
        FROM personal_dashboard_time_date
        WHERE PlayerID = ?
        GROUP BY YEAR(date), MONTH(date)
        ORDER BY YEAR(date), MONTH(date)
      `;

        db.query(monthlyQuery, [user.PlayerID], (err, monthlyResults) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
          }

          const monthlyStats = monthlyResults.map((row) => {
            const hrs = Math.floor(row.totalTimeInSeconds / 3600);
            const mins = Math.floor((row.totalTimeInSeconds % 3600) / 60);
            const monthName = new Date(row.year, row.month - 1).toLocaleString(
              "default",
              {
                month: "long",
              }
            );

            return {
              month: `${monthName}`,
              matchesPlayed: row.totalMatches,
              timePlayed: hrs,
            };
          });

          // Third: get available tables
          const availableTablesQuery = `
          SELECT TableID FROM tables 
          WHERE Status = 'Available'
          ORDER BY TableID
        `;

          db.query(availableTablesQuery, (err, tablesResult) => {
            if (err) {
              console.error("Database error:", err);
              return res.status(500).json({ message: "Internal server error" });
            }

            const availableTables = tablesResult.map((table) => table.TableID);

            // req.session.player = {
            //   id: userData.id,
            //   userName: userData.userName,
            //   fullName: userData.fullName,
            // };
            // req.session.save((err) => {
            //   if (err) console.error("Session save error:", err);
            //   console.log("Session saved successfully!");
            // });

            res.status(200).json({
              message: "login successful",
              user: userData,
              personalDashboardTimeAndDate: monthlyStats,
              availableTables: availableTables,
            });
          });
        });
      }
    );
  });
};

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Export multer middleware for routes
export const upload = multer({ storage });

// Controller for uploading profile picture
export const uploadProfilePicture = async (req, res) => {
  // console.log("Body:", req.body);
  //   console.log("File:", req.file);
  try {
    const { playerId } = req.body;
    const filePath = req.file?.path;

    if (!playerId || !filePath) {
      return res
        .status(400)
        .json({ message: "Player ID and profile picture file are required." });
    }

    const sql = "UPDATE players SET path = ? WHERE PlayerID = ?";
    db.query(sql, [filePath, playerId], (err, result) => {
      if (err) {
        console.error("Error updating player profile picture:", err);
        return res.status(500).json({ message: "Database error" });
      }

      res.status(200).json({
        message: "Profile picture uploaded and path updated successfully.",
        path: filePath,
      });
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserProfilePicture = (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const sql = "SELECT path FROM players WHERE PlayerID = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const imagePath = results[0].path;

    if (!imagePath) {
      return res.status(404).json({ error: "Profile picture not found" });
    }

    const fullImagePath = path.join(__dirname, "..", imagePath);

    res.sendFile(fullImagePath, (err) => {
      if (err) {
        console.error("File sending error:", err);
        res.status(500).json({ error: "Failed to send image" });
      }
    });
  });
};

export const bookTable = (req, res) => {
  const { name, date, time, tableId, duration, phone, playerId } = req.body;

  // Validate all fields
  if (!name || !date || !time || !tableId || !duration || !phone || !playerId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Step 1: Check if the table is available
  const checkTableQuery = "SELECT Status FROM tables WHERE TableID = ?";
  db.query(checkTableQuery, [tableId], (err, result) => {
    if (err) {
      console.error("Error checking table status:", err);
      return res
        .status(500)
        .json({ message: "Database error while checking table status." });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Table not found." });
    }

    const tableStatus = result[0].Status;

    if (tableStatus === "In-Use" || tableStatus === "Maintenance") {
      return res
        .status(400)
        .json({ message: "Table is not available for booking." });
    }

    // Step 2: Book the table (insert into booktable)
    const insertBookingQuery = `
          INSERT INTO booktable (Name, Date, Time, TableID, DurationHours, Phone, PlayerID)
          VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
    const values = [name, date, time, tableId, duration, phone, playerId];

    db.query(insertBookingQuery, values, (err, result) => {
      if (err) {
        console.error("Error inserting booking:", err);
        return res
          .status(500)
          .json({ message: "Database error while booking table." });
      }
    });
  });
};
