import mongoose from "mongoose";

const ScriptureThoughtSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scripture: { type: String, required: true },
    thought: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("ScriptureThought", ScriptureThoughtSchema);
