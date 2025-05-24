import express from "express";
const router = express.Router();
import { superadminregister,superadminlogin, superAdminresetPass, decodetoken 
 } from '../controllers/superAdmin.controller.js'

router.post("/register",  superadminregister);
router.post("/login", superadminlogin);
router.post("/resetpassword", superAdminresetPass );
router.get("/decodetoken", decodetoken);

export default router;
