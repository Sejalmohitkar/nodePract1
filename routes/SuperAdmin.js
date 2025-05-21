import express from "express";
const router = express.Router();
import { superadminregister,superadminlogin,
 } from '../controllers/superAdmin.controller.js'

router.post("/register",  superadminregister);
router.post("/login", superadminlogin);

export default router;
