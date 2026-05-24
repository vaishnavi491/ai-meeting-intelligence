import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  createMeeting,
  getMeetings,
  getMeetingById,
  deleteMeeting,
} from "../controllers/meetingController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("file"),
  createMeeting
);

router.get(
  "/",
  protect,
  getMeetings
);

router.get(
  "/:id",
  protect,
  getMeetingById
);

router.delete(
  "/:id",
  protect,
  deleteMeeting
);

export default router;