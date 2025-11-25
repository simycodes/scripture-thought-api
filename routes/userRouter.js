import { Router } from "express";
const router = Router();

import { getAllUsers, getCurrentUser, updateUser, deleteUser } from "../controllers/userController.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";

router.get("/current-user", getCurrentUser);
router.patch("/update-user", updateUser);
router.get("/admin/all-users", authorizePermissions("admin"), getAllUsers);
router.delete("/admin/delete-user/:id", authorizePermissions("admin"), deleteUser);


export default router;
