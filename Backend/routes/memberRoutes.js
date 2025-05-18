import express from "express";
import {
  createMember,
  loginMember,
  uploadProfilePicture,
  upload,
  bookTable,
  getUserProfilePicture,
} from "../controllers/memberController.js";

const router = express.Router();

router.post("/", createMember);
router.post("/login", loginMember);
router.post(
  "/upload-profile-picture",
  upload.single("profilePicture"),
  uploadProfilePicture
);
router.post("/booktable", bookTable);
router.get("/getProfile/:userId", getUserProfilePicture);

export default router;
