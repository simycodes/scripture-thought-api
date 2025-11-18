import express from "express";
import {
  createComment,
  getCommentsForThought,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
import authenticateUser from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticateUser, createComment);
router.get("/:thoughtId", authenticateUser, getCommentsForThought);
router.patch("/:id", authenticateUser, updateComment);
router.delete("/:id", authenticateUser, deleteComment);

export default router;
