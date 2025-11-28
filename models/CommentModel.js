import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    thoughtId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ScriptureThought",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
