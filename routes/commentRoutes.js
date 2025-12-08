import express from "express";
import {
  createComment,
  getCommentsForThought,
  getSingleComment,
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

// COMMENT CRUD ROUTES 
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

router.get("/get-single-comment/:id", validateCommentIdParam, getSingleComment);

router.patch(
  "/:id",
  validateCommentIdParam,
  validateCommentUpdateInput,
  updateComment
);
router.delete("/:id", validateCommentIdParam, deleteComment);

export default router;
