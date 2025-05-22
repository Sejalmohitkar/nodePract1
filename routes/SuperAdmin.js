import express from "express";
const router = express.Router();
import { superadminregister,superadminlogin, superAdminresetPass 
 } from '../controllers/superAdmin.controller.js'

router.post("/register",  superadminregister);
router.post("/login", superadminlogin);
router.post("/reset-password", superAdminresetPass );

export default router;
