// admin.js
import express from "express";
const router = express.Router();
import { adminregister,
  adminlogin,
  adminresetpass,
  decodeToken
 } from '../controllers/admin.controller.js'

router.post("/register", adminregister);
router.post("/login", adminlogin);
router.post("/resetpassword", adminresetpass)
router.get("/decodetoken", decodeToken)

export default router;
