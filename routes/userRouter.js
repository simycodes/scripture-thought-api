import { Router } from "express";
const router = Router();

import { getAllUsers, getCurrentUser, updateUser, deleteUser } from "../controllers/userController.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";

router.get("/current-user", getCurrentUser);
router.patch("/update-user", updateUser);
router.get("/admin/all-users", authorizePermissions("admin"), getAllUsers);
router.patch("/admin/delete-user", authorizePermissions("admin"), deleteUser);


export default router;
