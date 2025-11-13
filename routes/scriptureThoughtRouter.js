import express from 'express';
import { 
    createThought, getAllThoughtsByUser,
    getOneThoughtById, getAllThoughts,
    updateThoughtById, deleteThoughtById
 } from '../controllers/scriptureThoughtController.js';

const router = express.Router();

router.post('/create-thought', createThought);
router.get("/get-all-thoughts-user", getAllThoughtsByUser);
router.get("/get-thought/:id", getOneThoughtById);
router.get("/get-all-thoughts", getAllThoughts);
router.get("/update-thought/:id", updateThoughtById);
router.delete("/delete-thought/:id", deleteThoughtById);

export default router;