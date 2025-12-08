import { Router } from "express";
const router = Router();

import {
  getAllUsers,
  getCurrentUser,
  updateUser,
  deleteUser,
  getUsersForScriptureThoughts,
  getUserForSingleScriptureThought,
} from "../controllers/userController.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";

// USER CRUD ROUTES 
router.get("/current-user", getCurrentUser);
router.patch("/update-user", validateUpdateUserInput, updateUser);
router.get("/admin/all-users", authorizePermissions("admin"), getAllUsers);
router.delete("/admin/delete-user/:id", authorizePermissions("admin"), deleteUser);
router.get("/get-users-for-scripture-thoughts", getUsersForScriptureThoughts);
router.get("/get-user-for-single-scripture-thought/:id", getUserForSingleScriptureThought);

export default router;
