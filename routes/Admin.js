// admin.js
import express from "express";
const router = express.Router();
import { adminregister,
  adminlogin,
  adminresetpass
 } from '../controllers/admin.controller.js'

router.post("/register", adminregister);
router.post("/login", adminlogin);
router.post("/resetpassword", adminresetpass)

export default router;
