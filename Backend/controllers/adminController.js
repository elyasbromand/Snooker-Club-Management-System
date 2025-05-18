import db from "../db.js";

export const createTable = (req, res) => {
  // Step 1: Extract data from the request body
  const { TableNumber, TableType, HourlyRate } = req.body;

  // Step 2: Validation - make sure all fields are present
  if (!TableNumber || !TableType || !HourlyRate) {
    return res.status(400).json({
      message: "All fields (TableNumber, TableType, HourlyRate) are required.",
    });
  }

  // Step 3: Prepare SQL query for inserting the new table into the database
  const query = `INSERT INTO tables (TableNumber, TableType, HourlyRate) VALUES (?, ?, ?)`;
  const values = [TableNumber, TableType, HourlyRate];

  // Step 4: Execute the query to insert the data into the database
  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Error occurred while inserting data into the database.",
      });
    }

    // Step 5: Return a success message with the created table information
    res.status(201).json({
      message: "Table created successfully!",
      table: {
        TableNumber,
        TableType,
        HourlyRate,
      },
    });
  });
};

export const getAllTables = (req, res) => {
  // Step 1: Query to select all tables from the 'tables' table
  const query = "SELECT * FROM tables";

  // Step 2: Execute the query to retrieve the tables
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Error occurred while fetching tables from the database.",
      });
    }

    // Step 3: Return the result as a JSON response
    res.status(200).json({
      message: "Tables fetched successfully!",
      tables: result,
    });
  });
};

export const createPlayer = (req, res) => {
  console.log(req.body);
  const { Fullname, userName, phone, address, password } = req.body;

  // Validate required fields (optional but recommended)
  if (!Fullname || !userName || !password || !phone || !address) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query = `
        INSERT INTO players (FullName, userName, Password, Phone, Address)
        VALUES (?, ?, ?, ?, ?)
    `;

  db.query(
    query,
    [Fullname, userName, password, phone, address],
    (err, result) => {
      if (err) {
        console.error("Error inserting player:", err);
        return res
          .status(500)
          .json({ message: "Database error while creating player." });
      }

      return res.status(201).json({
        message: "Player created successfully!",
        playerId: result.insertId,
      });
    }
  );
};

export const getAllPlayers = (req, res) => {
  const query = "SELECT * FROM players";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching players:", err);
      return res.status(500).json({ message: "Failed to retrieve players." });
    }

    return res.status(200).json(results);
  });
};

export const createJournalEntry = (req, res) => {
  // Step 1: Extract data from the request body
  const { title, type, amount, description, related, createdBy } = req.body;

  // Step 2: Validation - make sure all required fields are present
  if (!title || !type || !amount || !createdBy) {
    return res.status(400).json({
      message:
        "Fields 'title', 'type', 'amount', and 'createdBy' are required.",
    });
  }

  // Step 3: Prepare SQL query for inserting the new journal entry into the database
  const query = `INSERT INTO journal (title, type, amount, description, RelatedTo, createdBy) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [title, type, amount, description, related, createdBy];

  // Step 4: Execute the query
  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Error occurred while inserting data into the journal.",
      });
    }

    // Step 5: Success response
    res.status(201).json({
      message: "Journal entry created successfully!",
      journal: {
        title,
        type,
        amount,
        description,
        related,
        createdBy,
      },
    });
  });
};

export const getAllJournalEntries = (req, res) => {
  const query = `SELECT * FROM journal ORDER BY EntryDate DESC`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching journal entries:", err);
      return res
        .status(500)
        .json({ message: "Failed to retrieve journal entries." });
    }

    res.status(200).json({ journals: results });
  });
};

export const createSupplier = (req, res) => {
  console.log(req.body);
  const { Name, Email, ContactInfo, Type, Address } = req.body;

  if (!Name || !Email || !Type) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query = `
      INSERT INTO suppliers (Name, email, ContactInfo, Type, Address)
      VALUES (?, ?, ?, ?, ?)
    `;

  db.query(query, [Name, Email, ContactInfo, Type, Address], (err, result) => {
    if (err) {
      console.error("Error inserting supplier:", err);
      return res.status(500).json({ message: "Database error." });
    }

    res.status(201).json({
      message: "Supplier created successfully.",
      supplierId: result.insertId,
    });
  });
};

export const getAllSuppliers = (req, res) => {
  const query = "SELECT * FROM suppliers";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching suppliers:", err);
      return res.status(500).json({ error: "Failed to fetch suppliers." });
    }

    res.status(200).json(results);
    // console.log(results);
  });
};

export const createCafeRecord = (req, res) => {
  //console.log(req.body);
  const { itemId, quantity, soldBy, tableID } = req.body;

  if (!itemId || !quantity || !soldBy || !tableID) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query = `
      INSERT INTO cafesales (ItemID, Quantity, SoldBy, tableID)
      VALUES (?, ?, ?, ?)
    `;

  db.query(query, [itemId, quantity, soldBy, tableID], (err, result) => {
    if (err) {
      console.error("Error inserting Cafe Record:", err);
      return res.status(500).json({ message: "Database error." });
    }

    res.status(201).json({
      message: "Record created successfully.",
      record: result.insertId,
    });
  });
};

export const showCafeRecords = (req, res) => {
  const query = "SELECT * FROM cafesales";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching cafe records:", err);
      return res.status(500).json({ error: "Failed to fetch cafe records." });
    }

    res.status(200).json(results);
  });
};

export const createInventoryRecord = (req, res) => {
  //console.log(req.body);
  const { itemName, supplierId, category, quantity, costPerUnit, salePrice } =
    req.body;

  if (
    !itemName ||
    !supplierId ||
    !category ||
    !costPerUnit ||
    !quantity ||
    !salePrice
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query = `
    INSERT INTO inventory (ItemName, SupplierID, Category, Quantity, CostPerUnit, salePrice)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [itemName, supplierId, category, quantity, costPerUnit, salePrice],
    (err, result) => {
      if (err) {
        console.error("Error inserting inventory Record:", err);
        return res.status(500).json({ message: "Database error." });
      }

      res.status(201).json({
        message: "Record created successfully.",
        record: result.insertId,
      });
    }
  );
};

export const showInventoryRecords = (req, res) => {
  const query = "SELECT * FROM inventory_overview";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching Inventory records:", err);
      return res
        .status(500)
        .json({ error: "Failed to fetch Inventory records." });
    }

    res.status(200).json(results);
  });
};

export const createUser = (req, res) => {
  const { fullName, email, phone, role, password } = req.body;

  if (!fullName || !email || !phone || !role || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query = `
  INSERT INTO users (FullName, Email, Phone, Role, Password)
  VALUES (?, ?, ?, ?, ?)
`;

  db.query(query, [fullName, email, phone, role, password], (err, result) => {
    if (err) {
      console.error("Error inserting inventory Record:", err);
      return res.status(500).json({ message: "Database error." });
    }

    res.status(201).json({
      message: "Record created successfully.",
      record: result.insertId,
    });
  });
};

export const getAllUsers = (req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).send({ message: "Error fetching users" });
    }

    res.json({ users: results });
  });
};

export const gameHistoryFirstForm = (req, res) => {
  const { table, player1, player2, startTime, hourlyRate, notes } = req.body;
  if (!table || !player1 || !player2 || !startTime || !hourlyRate || !notes) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const insertQuery = `
    INSERT INTO gamehistory
      (TableID, Player1ID, Player2ID, StartTime, TotalAmount, hourlyRate, Notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    insertQuery,
    [table, player1, player2, startTime, 0, hourlyRate, notes],
    (err, result) => {
      if (err) {
        console.error("Error inserting Game Record:", err);
        return res.status(500).json({ message: "Database error." });
      }

      // 1) Update the table's status to "In-Use"
      const updateStatusQuery = `UPDATE tables SET Status = 'In-Use' WHERE TableID = ?`;
      db.query(updateStatusQuery, [table], (updateErr) => {
        if (updateErr) {
          console.error("Error updating table status:", updateErr);
          return res.status(500).json({
            message: "Record created but failed to update table status.",
          });
        }

        // 2) Award 1 loyalty point to each player
        const updateLoyaltyQuery = `
          UPDATE players
          SET LoyaltyPoints = LoyaltyPoints + 1
          WHERE PlayerID IN (?, ?)
        `;
        db.query(updateLoyaltyQuery, [player1, player2], (loyaltyErr) => {
          if (loyaltyErr) {
            console.error("Error updating player loyalty:", loyaltyErr);
            // we’ll still return success for the main record
            return res.status(201).json({
              message:
                "Record created and table status updated, but failed to award loyalty points.",
              record: result.insertId,
            });
          }

          // All done!
          res.status(201).json({
            message:
              "Record created successfully, table status updated, and loyalty points awarded.",
            record: result.insertId,
          });
        });
      });
    }
  );
};

export const gameHistorySecondForm = (req, res) => {
  const { table, EndTime, TotalAmount } = req.body;

  if (!EndTime || !TotalAmount || !table) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Step 1: Find the latest GameID for this TableID
  const getLatestGameIDQuery = `
    SELECT GameID FROM gamehistory 
    WHERE TableID = ? 
    ORDER BY GameID DESC 
    LIMIT 1
  `;

  db.query(getLatestGameIDQuery, [table], (err, rows) => {
    if (err || rows.length === 0) {
      console.error("Error fetching latest GameID:", err);
      return res
        .status(500)
        .json({ message: "Failed to find the latest game for this table." });
    }

    const latestGameID = rows[0].GameID;

    // Step 2: Update that game record
    const updateGameQuery = `
      UPDATE gamehistory 
      SET EndTime = ?, TotalAmount = ?
      WHERE GameID = ?
    `;

    db.query(
      updateGameQuery,
      [EndTime, TotalAmount, latestGameID],
      (updateErr) => {
        if (updateErr) {
          console.error("Error updating game record:", updateErr);
          return res
            .status(500)
            .json({ message: "Database error during game update." });
        }

        // Step 3: Set the table status to Available
        const updateTableStatusQuery = `
        UPDATE tables SET Status = 'Available' WHERE TableID = ?
      `;

        db.query(updateTableStatusQuery, [table], (statusErr) => {
          if (statusErr) {
            console.error("Error updating table status:", statusErr);
            return res
              .status(500)
              .json({
                message: "Game updated but failed to update table status.",
              });
          }

          res.status(200).json({
            message: "Game updated successfully and table marked as Available.",
          });
        });
      }
    );
  });
};

export const gameHistoryViewTable = (req, res) => {
  const query = "SELECT * FROM gamehistoryfinalview ORDER BY GameID DESC";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching game history:", err);
      return res.status(500).send({ message: "Error fetching game history" });
    }

    res.json({ results });
  });
};

export const editUser = (req, res) => {
  const userID = req.params.userID;
  const { fullName, email, phone, role } = req.body;

  // Ensure all required fields are provided
  if (!userID || !fullName || !email || !phone || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create the SQL query to update the user
  const query = `
    UPDATE users
    SET FullName = ?, Email = ?, Phone = ?, Role = ?
    WHERE UserID = ?
  `;

  // Execute the query
  db.query(query, [fullName, email, phone, role, userID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to update user" });
    }

    // If the update is successful
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "User updated successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  });
};

export const deleteUser = (req, res) => {
  const userID = req.params.userID;

  // Check if userID is provided
  if (!userID) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Create the SQL query to delete the user
  const query = "DELETE FROM users WHERE UserID = ?";

  // Execute the query
  db.query(query, [userID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to delete user" });
    }

    // If the delete is successful
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  });
};

export const editCanteen = (req, res) => {
  // Extract SaleID from URL parameters
  const SaleID = req.params.SaleID;

  // Extract data from request body
  const { itemId, quantity, soldBy, tableID } = req.body;

  // Validate inputs
  if (!SaleID || !itemId || !quantity || !soldBy || !tableID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // SQL query to update the cafesale
  const query = `
    UPDATE cafesales
    SET ItemID = ?, Quantity = ?, SoldBy = ?, tableID = ?
    WHERE SaleID = ?
  `;

  // Execute query
  db.query(
    query,
    [itemId, quantity, soldBy, tableID, SaleID],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update cafe sale" });
      }

      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json({ message: "Cafe sale updated successfully" });
      } else {
        return res.status(404).json({ message: "Cafe sale not found" });
      }
    }
  );
};

export const deleteCanteen = (req, res) => {
  // Get SaleID from URL parameters
  const SaleID = req.params.SaleID;

  // Check if SaleID is provided
  if (!SaleID) {
    return res.status(400).json({ message: "SaleID is required" });
  }

  // SQL DELETE query
  const query = `DELETE FROM cafesales WHERE SaleID = ?`;

  // Execute the query
  db.query(query, [SaleID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to delete cafe sale" });
    }

    if (result.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Cafe sale deleted successfully" });
    } else {
      return res.status(404).json({ message: "Cafe sale not found" });
    }
  });
};

export const editJournal = (req, res) => {
  // Correct way to get JournalID from URL params
  const JournalID = req.params.JournalID;
  const { title, type, amount, description, related, createdBy } = req.body;

  if (
    !JournalID ||
    !title ||
    !type ||
    !amount ||
    !description ||
    !related ||
    !createdBy
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = `
    UPDATE journal
    SET Title = ?, Type = ?, Amount = ?, Description = ?, RelatedTo = ?, CreatedBy = ?
    WHERE JournalID = ?
  `;

  db.query(
    query,
    [title, type, amount, description, related, createdBy, JournalID],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Failed to update journal entry" });
      }

      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json({ message: "Journal entry updated successfully" });
      } else {
        return res.status(404).json({ message: "Journal entry not found" });
      }
    }
  );
};

export const deleteJournal = (req, res) => {
  // Correct way to get JournalID from URL params
  const JournalID = req.params.JournalID;

  if (!JournalID) {
    return res.status(400).json({ message: "JournalID is required" });
  }

  const query = `DELETE FROM journal WHERE JournalID = ?`;

  db.query(query, [JournalID], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Failed to delete journal entry" });
    }

    if (result.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Journal entry deleted successfully" });
    } else {
      return res.status(404).json({ message: "Journal entry not found" });
    }
  });
};

export const editPlayer = (req, res) => {
  // Correct way to get PlayerID from URL params
  const PlayerID = req.params.PlayerID;
  const { Fullname, userName, phone, address } = req.body;

  if (!PlayerID || !Fullname || !userName || !phone || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = `
    UPDATE players
    SET Fullname = ?, userName = ?, phone = ?, address = ?
    WHERE PlayerID = ?
  `;

  db.query(query, [Fullname, userName, phone, address, PlayerID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update player' });
    }

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Player updated successfully' });
    } else {
      return res.status(404).json({ message: 'Player not found' });
    }
  });
};

export const deletePlayer = (req, res) => {
  // Get PlayerID from URL parameters
  const PlayerID = req.params.PlayerID;

  if (!PlayerID) {
    return res.status(400).json({ message: 'PlayerID is required' });
  }

  const query = `DELETE FROM players WHERE PlayerID = ?`;

  db.query(query, [PlayerID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to delete player' });
    }

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Player deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Player not found' });
    }
  });
};

export const editSupplier = (req, res) => {
  // Get SupplierID from URL params
  const SupplierID = req.params.SupplierID;
  const { Name, Email, ContactInfo, Address, Type } = req.body;

  if (!SupplierID || !Name || !Email || !ContactInfo || !Address || !Type) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = `
    UPDATE suppliers
    SET Name = ?, Email = ?, ContactInfo = ?, Address = ?, Type = ?
    WHERE SupplierID = ?
  `;

  db.query(query, [Name, Email, ContactInfo, Address, Type, SupplierID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update supplier' });
    }

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Supplier updated successfully' });
    } else {
      return res.status(404).json({ message: 'Supplier not found' });
    }
  });
};

export const deleteSupplier = (req, res) => {
  // Get SupplierID from URL params
  const SupplierID = req.params.SupplierID;

  if (!SupplierID) {
    return res.status(400).json({ message: 'SupplierID is required' });
  }

  const query = `DELETE FROM suppliers WHERE SupplierID = ?`;

  db.query(query, [SupplierID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to delete supplier' });
    }

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Supplier deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Supplier not found' });
    }
  });
};

export const editInventory = (req, res) => {
  const ItemID = req.params.ItemID;
  const { itemName, supplierId, category, quantity, costPerUnit, salePrice } = req.body;

  if (!ItemID || !itemName || !supplierId || !category || !quantity || !costPerUnit || !salePrice) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = `
    UPDATE inventory
    SET ItemName = ?, SupplierID = ?, Category = ?, Quantity = ?, 
        CostPerUnit = ?, salePrice = ?
    WHERE ItemID = ?
  `;

  db.query(query, [itemName, supplierId, category, quantity, costPerUnit, salePrice, ItemID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update inventory item' });
    }

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Inventory item updated successfully' });
    } else {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
  });
};

export const deleteInventory = (req, res) => {
  const ItemID = req.params.ItemID;

  if (!ItemID) {
    return res.status(400).json({ message: 'ItemID is required' });
  }

  const query = `DELETE FROM inventory WHERE ItemID = ?`;

  db.query(query, [ItemID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to delete inventory item' });
    }

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Inventory item deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
  });
};

export const editTable = (req, res) => {
  const TableID = req.params.TableID;
  const { TableNumber, TableType, HourlyRate } = req.body;

  if (!TableID || !TableNumber || !TableType || !HourlyRate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = `
    UPDATE tables
    SET TableNumber = ?, TableType = ?, HourlyRate = ?
    WHERE TableID = ?
  `;

  db.query(query, [TableNumber, TableType, HourlyRate, TableID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update table' });
    }

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Table updated successfully' });
    } else {
      return res.status(404).json({ message: 'Table not found' });
    }
  });
};

// export const deleteTable = (req, res) => {
//   const TableID = req.params.TableID;

//   if (!TableID) {
//     return res.status(400).json({ message: 'TableID is required' });
//   }

//   const query = `DELETE FROM tables WHERE TableID = ?`;

//   db.query(query, [TableID], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Failed to delete table' });
//     }

//     if (result.affectedRows > 0) {
//       return res.status(200).json({ message: 'Table deleted successfully' });
//     } else {
//       return res.status(404).json({ message: 'Table not found' });
//     }
//   });
// };

export const adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const sql = "SELECT * FROM users WHERE username = ?";

  db.query(sql, [username], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = result[0];

    if (password !== user.Password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Set session data
    req.session.user = {
      userId: user.UserID,
      role: user.Role,
      username: user.username,
    };

    // Exclude password from user data in response
    const { Password, ...userData } = user;

    res.status(200).json({
      message: "Login successful!",
      user: userData,
    });
  });
};

export const availableTable = (req, res) => {
  const query = "SELECT * FROM tables WHERE Status = 'Available'";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).send({ message: "Error fetching users" });
    }

    res.json({  results });
  });
};

export const staffMembersNotAdmin = (req, res) => {
const query = "SELECT * FROM users WHERE Role IN ('staff', 'cafe')";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).send({ message: "Error fetching users" });
    }

    res.json({  results });
  });
};

// export const createBooking = (req, res) => {
//   const { name, date, time, table, duration, phone, playerId } = req.body;

//   // Validate all required fields
//   if (!name || !date || !time || !table || !duration || !phone || !playerId) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

  

//   const query = `
//     INSERT INTO booktable 
//     (Name, Date, Time, TableID, DurationHours, Phone, PlayerID)
//     VALUES (?, ?, ?, ?, ?, ?, ?)
//   `;

//   db.query(
//     query,
//     [name, date, time, table, duration, phone, playerId],
//     (err, result) => {
//       if (err) {
//         console.error("Error creating booking:", err);
//         return res.status(500).json({ message: "Database error." });
//       }

//       res.status(201).json({
//         message: "Booking created successfully.",
//         bookingId: result.insertId,
//       });
//     }
//   );
// };

export const getAllBooking = (req, res) => {
const query = "SELECT * FROM booktable ORDER BY BookingID DESC";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching records:", err);
      return res.status(500).send({ message: "Error fetching records" });
    }
    res.json({ results });
  });
};

// export const updateBooking = (req, res) => {
//   const { id } = req.params;
//   const { name, date, time, table, duration, phone, playerId } = req.body;

//   if (!name || !date || !time || !table || !duration || !phone || !playerId) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   const query = `
//     UPDATE booktable 
//     SET Name = ?, Date = ?, Time = ?, TableID = ?, DurationHours = ?, Phone = ?, PlayerID = ?
//     WHERE BookingID = ?
//   `;

//   db.query(
//     query,
//     [name, date, time, table, duration, phone, playerId, id],
//     (err, result) => {
//       if (err) {
//         console.error("Error updating booking:", err);
//         return res.status(500).json({ message: "Database error." });
//       }

//       res.status(200).json({ message: "Booking updated successfully." });
//     }
//   );
// };

export const deleteBooking = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM booktable WHERE BookingID = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting booking:", err);
      return res.status(500).json({ message: "Database error." });
    }

    res.status(200).json({ message: "Booking deleted successfully." });
  });
};

export const createBooking = (req, res) => {
  const { name, date, time, table, duration, phone, playerId } = req.body;

  // Validate all required fields
  if (!name || !date || !time || !table || !duration || !phone || !playerId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Convert time to minutes for easier comparison
  const [hours, minutes] = time.split(':').map(Number);
  const startMinutes = hours * 60 + minutes;
  const endMinutes = startMinutes + (duration * 60);

  // First check if the table is already booked at this time
  const checkAvailabilityQuery = `
    SELECT * FROM booktable 
    WHERE TableID = ? 
    AND Date = ? 
    AND (
      (TIME_TO_SEC(Time) / 60) < ? AND 
      ((TIME_TO_SEC(Time) / 60) + (DurationHours * 60)) > ?
    )
  `;

  db.query(
    checkAvailabilityQuery,
    [table, date, endMinutes, startMinutes],
    (err, results) => {
      if (err) {
        console.error("Error checking availability:", err);
        return res.status(500).json({ message: "Database error." });
      }

      if (results.length > 0) {
        return res.status(409).json({ 
          message: "Table is already booked at this time.",
          conflictingBookings: results 
        });
      }

      // If no conflicts, proceed with creating the booking
      const createQuery = `
        INSERT INTO booktable 
        (Name, Date, Time, TableID, DurationHours, Phone, PlayerID)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        createQuery,
        [name, date, time, table, duration, phone, playerId],
        (err, result) => {
          if (err) {
            console.error("Error creating booking:", err);
            return res.status(500).json({ message: "Database error." });
          }

          res.status(201).json({
            message: "Booking created successfully.",
            bookingId: result.insertId,
          });
        }
      );
    }
  );
};

export const updateBooking = (req, res) => {
  const { id } = req.params;
  const { name, date, time, table, duration, phone, playerId } = req.body;

  if (!name || !date || !time || !table || !duration || !phone || !playerId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Convert time to minutes for easier comparison
  const [hours, minutes] = time.split(':').map(Number);
  const startMinutes = hours * 60 + minutes;
  const endMinutes = startMinutes + (duration * 60);

  // First check if the table is already booked at this time (excluding current booking)
  const checkAvailabilityQuery = `
    SELECT * FROM booktable 
    WHERE TableID = ? 
    AND Date = ? 
    AND BookingID != ?
    AND (
      (TIME_TO_SEC(Time) / 60) < ? AND 
      ((TIME_TO_SEC(Time) / 60) + (DurationHours * 60)) > ?
    )
  `;

  db.query(
    checkAvailabilityQuery,
    [table, date, id, endMinutes, startMinutes],
    (err, results) => {
      if (err) {
        console.error("Error checking availability:", err);
        return res.status(500).json({ message: "Database error." });
      }

      if (results.length > 0) {
        return res.status(409).json({ 
          message: "Table is already booked at this time.",
          conflictingBookings: results 
        });
      }

      // If no conflicts, proceed with updating the booking
      const updateQuery = `
        UPDATE booktable 
        SET Name = ?, Date = ?, Time = ?, TableID = ?, DurationHours = ?, Phone = ?, PlayerID = ?
        WHERE BookingID = ?
      `;

      db.query(
        updateQuery,
        [name, date, time, table, duration, phone, playerId, id],
        (err, result) => {
          if (err) {
            console.error("Error updating booking:", err);
            return res.status(500).json({ message: "Database error." });
          }

          if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Booking not found." });
          }

          res.status(200).json({ message: "Booking updated successfully." });
        }
      );
    }
  );
};

export const getDashboardStats = (req, res) => {
  const stats = {};

  // 1. Count all tables
  const tablesQuery = "SELECT COUNT(*) AS tableCount FROM tables";
  
  // 2. Count all players
  const playersQuery = "SELECT COUNT(*) AS playerCount FROM players";
  
  // 3. Count all suppliers
  const suppliersQuery = "SELECT COUNT(*) AS supplierCount FROM suppliers";
  
  // 4. Journal counts and amounts (income/expense)
  const journalQuery = `
    SELECT 
      SUM(CASE WHEN Type = 'Income' THEN 1 ELSE 0 END) AS incomeCount,
      SUM(CASE WHEN Type = 'Expense' THEN 1 ELSE 0 END) AS expenseCount,
      SUM(CASE WHEN Type = 'Income' THEN Amount ELSE 0 END) AS totalJournalIncome,
      SUM(CASE WHEN Type = 'Expense' THEN Amount ELSE 0 END) AS totalJournalExpense
    FROM journal
  `;
  
  // 5. Canteen sales count and total revenue
  const cafeSalesQuery = `
    SELECT 
      COUNT(*) AS cafeSalesCount,
      SUM(i.salePrice * cs.Quantity) AS totalCafeRevenue
    FROM cafesales cs
    JOIN inventory i ON cs.ItemID = i.ItemID
  `;
  
  // 6. Inventory costs
  const inventoryQuery = `
    SELECT 
      SUM(Quantity * CostPerUnit) AS totalInventoryCost
    FROM inventory
  `;
  
  // 7. Count all users
  const usersQuery = "SELECT COUNT(*) AS userCount FROM users";
  
  // 8. Game history stats
  const gameHistoryQuery = `
    SELECT 
      COUNT(*) AS totalGamesPlayed,
      SUM(TotalAmount) AS totalGameRevenue
    FROM gamehistoryfinalview
  `;

  // Execute all queries
  db.query(tablesQuery, (err, results) => {
    if (err) return handleError(err, res);
    stats.tableCount = results[0].tableCount;
    
    db.query(playersQuery, (err, results) => {
      if (err) return handleError(err, res);
      stats.playerCount = results[0].playerCount;
      
      db.query(suppliersQuery, (err, results) => {
        if (err) return handleError(err, res);
        stats.supplierCount = results[0].supplierCount;
        
        db.query(journalQuery, (err, results) => {
          if (err) return handleError(err, res);
          stats.incomeCount = results[0].incomeCount;
          stats.expenseCount = results[0].expenseCount;
          stats.totalJournalIncome = results[0].totalJournalIncome || 0;
          stats.totalJournalExpense = results[0].totalJournalExpense || 0;
          
          db.query(cafeSalesQuery, (err, results) => {
            if (err) return handleError(err, res);
            stats.cafeSalesCount = results[0].cafeSalesCount;
            stats.totalCafeRevenue = results[0].totalCafeRevenue || 0;
            
            db.query(inventoryQuery, (err, results) => {
              if (err) return handleError(err, res);
              stats.totalInventoryCost = results[0].totalInventoryCost || 0;
              
              db.query(usersQuery, (err, results) => {
                if (err) return handleError(err, res);
                stats.userCount = results[0].userCount;
                
                db.query(gameHistoryQuery, (err, results) => {
                  if (err) return handleError(err, res);
                  stats.totalGamesPlayed = results[0].totalGamesPlayed;
                  stats.totalGameRevenue = results[0].totalGameRevenue || 0;
                  
                  // Calculate FINAL TOTALS
                  stats.totalCosts = (stats.totalInventoryCost + stats.totalJournalExpense) || 0;
                  stats.totalEarnings = (stats.totalCafeRevenue + stats.totalJournalIncome + stats.totalGameRevenue) || 0;
                  stats.netProfit = (stats.totalEarnings - stats.totalCosts) || 0;
                  
                  // All queries completed, send the response
                  res.json({ stats });
                });
              });
            });
          });
        });
      });
    });
  });
};

function handleError(err, res) {
  console.error("Error fetching dashboard statistics:", err);
  return res.status(500).send({ message: "Error fetching dashboard statistics" });
}