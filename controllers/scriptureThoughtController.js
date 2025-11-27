import mongoose from "mongoose";
import ScriptureThoughtModel from "../models/ScriptureThoughtModel.js";

export const createThought = async (req, res) => {
    try {
        const { description, scriptureVerse, thought } = req.body;

        if (!description || !scriptureVerse || !thought) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newThought = await ScriptureThoughtModel.create({
            user: req.user.userId,
            description,
            scriptureVerse,
            thought,
        });

        res.status(201).json(newThought);
    } catch (err) {
        res.status(500).json({
            message: "Error creating scripture thought",
            error: err.message,
        });
    }
};

export const getAllThoughtsByUser = async (req, res) => {
    try {

        const user = req.user.userId;

        if (!user) 
            return res.status(400).json({ message: "User not found." });

        const allThoughts = await ScriptureThoughtModel.find({ user }).sort({ createdAt: -1 });
        res.status(200).json(allThoughts);
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving scripture thoughts",
            error: err.message,
        });
    }
};

export const getOneThoughtById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user.userId;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid thought ID." });
        }

        const scriptureThought = await ScriptureThoughtModel.findOne({ _id: id, user });

        if (!scriptureThought) {
          return res.status(404).json({ message: "Thought not found." });
        }
        res.status(200).json({ scriptureThought });
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving scripture thought",
            error: err.message,
        });
    }
};

export const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await ScriptureThoughtModel.find().sort({ createdAt: -1 })
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(500).json({ 
            message: "Error fetching all thoughts",
            error: err.message 
        });
    }
};

export const updateThoughtById = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, scriptureVerse, thought } = req.body;
        const user = req.user.userId;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid thought ID" });
        }

        const updatedThought = await ScriptureThoughtModel.findOneAndUpdate(
          { _id: id, user },
          { description, scriptureVerse, thought },
          { new: true, runValidators: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: "Thought not found or user mismatch" });
        }

        res.status(200).json(updatedThought);
    } catch (err) {
        res.status(500).json({ message: "Error updating thought", error: err.message });
    }
};

export const deleteThoughtById = async (req, res) => {

    try {
        const { id } = req.params;
        const user = req.user.userId;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid thought ID" });
        }

        const deletedThought = await ScriptureThoughtModel.findOneAndDelete({ _id: id, user });

        if (!deletedThought) {
            return res.status(404).json({ message: "Thought not found or user mismatch" });
        }

        res.status(200).json({ message: "Thought deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting thought", error: err.message });
    }
};


export const likeThought = async (req, res) => {
    
    const { id } = req.params;
    const user = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid thought ID");
    }

    if (!mongoose.Types.ObjectId.isValid(user)) {
        res.status(400);
        throw new Error("Invalid user ID");
    }

    const thought = await ScriptureThoughtModel.findById(id);

    if (!thought) {
        res.status(404);
        throw new Error("Thought not found");
    }

    if (thought.likes.includes(user)) {
        res.status(400);
        throw new Error("You already liked this thought");
    }

    thought.likes.push(user);
    await thought.save();

    res.status(200).json({
        message: "Thought liked successfully",
        likeCount: thought.likes.length,
        thought,
    });
};


export const unlikeThought = async (req, res) => {
    const { id } = req.params;
    const user = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid thought ID");
    }

    if (!mongoose.Types.ObjectId.isValid(user)) {
        res.status(400);
        throw new Error("Invalid user ID");
    }

    const thought = await ScriptureThoughtModel.findById(id);

    if (!thought) {
        res.status(404);
        throw new Error("Thought not found");
    }

    if (!thought.likes.includes(user)) {
        res.status(400);
        throw new Error("You have not liked this thought");
    }

    thought.likes = thought.likes.filter(id => id.toString() !== user.toString());
    await thought.save();

    res.status(200).json({
        message: "Thought unliked successfully",
        likeCount: thought.likes.length,
        thought,
    });
};
