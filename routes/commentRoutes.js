import express from "express";
import {
  createComment,
  getCommentsForThought,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", createComment);
router.get("/:thoughtId", getCommentsForThought);
router.patch("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
