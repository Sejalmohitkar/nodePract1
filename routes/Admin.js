// admin.js
import express from "express";
const router = express.Router();
import { adminregister,
  adminlogin,
 } from '../controllers/admin.controller.js'


router.post("/register", adminregister);
router.post("/login", adminlogin);


export default router
