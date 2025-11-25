import express from 'express';
import { validateScriptureThoughtInput, validateScriptureThoughtIdParam } from "../middleware/validationMiddleware.js";

import { 
    createThought, getAllThoughtsByUser,
    getOneThoughtById, getAllThoughts,
    updateThoughtById, deleteThoughtById
 } from '../controllers/scriptureThoughtController.js';

const router = express.Router();

router.post('/create-thought', validateScriptureThoughtInput, createThought);
router.get("/get-all-thoughts-user", getAllThoughtsByUser);
router.get("/get-thought/:id", validateScriptureThoughtIdParam, getOneThoughtById);
router.get("/get-all-thoughts", getAllThoughts);
router.patch("/update-thought/:id", 
    validateScriptureThoughtIdParam, 
    validateScriptureThoughtInput, 
    updateThoughtById);
router.delete("/delete-thought/:id", validateScriptureThoughtIdParam, deleteThoughtById);

export default router;