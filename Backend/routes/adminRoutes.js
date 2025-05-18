import express from "express";
import {
  createTable,
  getAllTables,
  createPlayer,
  getAllPlayers,
  createJournalEntry,
  getAllJournalEntries,
  createSupplier,
  getAllSuppliers,
  createCafeRecord,
  showCafeRecords,
  createInventoryRecord,
  showInventoryRecords,
  createUser,
  getAllUsers,
  gameHistoryFirstForm,
  gameHistorySecondForm,
  gameHistoryViewTable,
  editUser,
  deleteUser,
  editCanteen,
  deleteCanteen,
  editJournal,
  deleteJournal,
  editPlayer,
  deletePlayer,
  editSupplier,
  deleteSupplier,
  editInventory,
  deleteInventory,
  editTable,
  adminLogin,
  availableTable,
  staffMembersNotAdmin,
  createBooking,
  getAllBooking,
  updateBooking,
  deleteBooking,
  getDashboardStats,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/adminLogin", adminLogin);
router.post("/createTable", createTable);
router.get("/getTable", getAllTables);
router.post("/createPlayer", createPlayer);
router.get("/getAllPlayers", getAllPlayers);
router.post("/createJournalEntry", createJournalEntry);
router.get("/getAllJournalEntries", getAllJournalEntries);
router.post("/createSupplier", createSupplier);
router.get("/getAllSuppliers", getAllSuppliers);
router.post("/createCafeRecord", createCafeRecord);
router.get("/showCafeRecords", showCafeRecords);
router.post("/createInventoryRecord", createInventoryRecord);
router.get("/showInventoryRecords", showInventoryRecords);
router.post("/createUser", createUser);
router.get("/getAllUsers", getAllUsers);
router.post("/gameHistoryFirstForm", gameHistoryFirstForm);
router.post("/gameHistorySecondForm", gameHistorySecondForm);
router.get("/gameHistoryViewTable", gameHistoryViewTable);
router.patch("/editUser/:userID", editUser);
router.delete("/deleteUser/:userID", deleteUser);
router.patch("/editCanteen/:SaleID", editCanteen);
router.delete("/deleteCanteen/:SaleID", deleteCanteen);
router.patch("/editJournal/:JournalID", editJournal);
router.delete("/deleteJournal/:JournalID", deleteJournal);
router.patch("/editPlayer/:PlayerID", editPlayer);
router.delete("/deletePlayer/:PlayerID", deletePlayer);
router.patch("/editSupplier/:SupplierID", editSupplier);
router.delete("/deleteSupplier/:SupplierID", deleteSupplier);
router.patch("/editInventory/:ItemID", editInventory);
router.delete("/deleteInventory/:ItemID", deleteInventory);
router.patch("/editTable/:TableID", editTable);
router.get("/availableTable", availableTable);
router.get("/staffMembersNotAdmin", staffMembersNotAdmin);
router.post("/createBooking", createBooking);
router.get("/getAllBooking", getAllBooking);
router.patch("/updateBooking/:id", updateBooking);
router.delete("/deleteBooking/:id", deleteBooking);
router.get("/getDashboardStats", getDashboardStats);

export default router;
