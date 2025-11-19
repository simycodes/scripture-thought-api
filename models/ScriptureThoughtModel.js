import mongoose from "mongoose"

const scriptureThoughtSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        scriptureVerse: {
            type: String,
            required: true,
            trim: true,
        },
        thought: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);


export default mongoose.model("ScriptureThought", scriptureThoughtSchema);