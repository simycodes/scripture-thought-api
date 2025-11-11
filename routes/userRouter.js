import { Router } from "express";
const router = Router();

import { getAllUsers, getCurrentUser } from "../controllers/userController.js";

router.get("/all-users", getAllUsers);
router.get("/current-user", getCurrentUser);


export default router;
