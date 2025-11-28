import { StatusCodes } from "http-status-codes";
import Comment from "../models/CommentModel.js";
import mongoose from "mongoose";

// CREATE COMMENT
export const createComment = async (req, res) => {
  const userId = req.user.userId;
  const { thoughtId, comment, name, lastName} = req.body;

  const newComment = await Comment.create({
    userId,
    thoughtId,
    comment,
    name,
    lastName
  });

  res.status(StatusCodes.CREATED).json({ comment: newComment });
};

// GET COMMENTS FOR A SCRIPTURE THOUGHT
export const getCommentsForThought = async (req, res) => {
  const { thoughtId } = req.params;

  const comments = await Comment.find({ thoughtId }).sort({ createdAt: -1 });

  res.status(StatusCodes.OK).json({ comments });
};

// GET SINGLE COMMENT
export const getSingleComment = async (req, res) => {
  console.log("getSingleComment controller reached!");
  const { id } = req.params;
  const comment = await Comment.findOne({ _id: id });
  console.log({ comment });
  res.status(StatusCodes.OK).json({ comment });
};

// UPDATE COMMENT (only your own)
export const updateComment = async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;
  const { comment } = req.body;

  const existing = await Comment.findById(id);
  if (!existing)
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Comment not found" });

  if (existing.userId.toString() !== userId)
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: "Not allowed to edit this comment" });

  existing.comment = comment;
  await existing.save();

  res.status(StatusCodes.OK).json({ comment: existing });
};

// DELETE COMMENT (only your own)
export const deleteComment = async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;

  const existing = await Comment.findById(id);
  if (!existing)
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Comment not found" });

  if (existing.userId.toString() !== userId)
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: "Not allowed to delete this comment" });

  await existing.deleteOne();

  res.status(StatusCodes.OK).json({ msg: "Comment deleted" });
};
