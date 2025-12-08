import mongoose from "mongoose"

const scriptureThoughtSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
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
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],
    },
    {
        timestamps: true,
    }
);

scriptureThoughtSchema.virtual("likeCount").get(function () {
    return this.likes.length;
});

scriptureThoughtSchema.set("toJSON", { virtuals: true });
scriptureThoughtSchema.set("toObject", { virtuals: true });

export default mongoose.model("ScriptureThought", scriptureThoughtSchema);

