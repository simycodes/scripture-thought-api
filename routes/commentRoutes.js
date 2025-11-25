import express from "express";
import {
  createComment,
  getCommentsForThought,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

import {
  validateCommentInput,
  validateCommentIdParam,
  validateCommentUpdateInput,
  validateScriptureThoughtIdInCommentCreation,
  validateScriptureThoughtIdInComment
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post(
  "/",
  validateScriptureThoughtIdInCommentCreation,
  validateCommentInput,
  createComment
);

router.get(
  "/:thoughtId",
  validateScriptureThoughtIdInComment,
  getCommentsForThought
);

router.patch(
  "/:id",
  validateCommentIdParam,
  validateCommentUpdateInput,
  updateComment
);
router.delete("/:id", validateCommentIdParam, deleteComment);

export default router;
