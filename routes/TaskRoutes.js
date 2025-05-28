import express from "express";
const router = express.Router();

import {createCollegeTask, getallCollegeTask, Asigntasks} from "../controllers/task.controller.js";

//task management
router.post ("/create-collegeTask", createCollegeTask)
router.post("/asign-task",Asigntasks)
router.get('/allCollegeTask', getallCollegeTask)

export default router;
