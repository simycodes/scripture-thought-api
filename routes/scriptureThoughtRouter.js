import express from 'express';
import { 
    createThought, getAllThoughtsByUser,
    getOneThoughtById, getAllThoughts,
    updateThoughtById, deleteThoughtById,
    likeThought, unlikeThought,
 } from '../controllers/scriptureThoughtController.js';

const router = express.Router();

router.post('/create-thought', createThought);
router.get("/get-all-thoughts-user", getAllThoughtsByUser);
router.get("/get-thought/:id", getOneThoughtById);
router.get("/get-all-thoughts", getAllThoughts);
router.put("/update-thought/:id", updateThoughtById);
router.delete("/delete-thought/:id", deleteThoughtById);
router.post("/like-thought/:id", likeThought);
router.post("/unlike-thought/:id", unlikeThought);

export default router;