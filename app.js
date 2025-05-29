import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./config.js"
import Adminroute from "./routes/Admin.js"
import UserRoutes from  "./routes/User.js"
import SuperAdminRoutes from "./routes/SuperAdmin.js"
import TaskRoutes from "./routes/TaskRoutes.js"
import AuthMiddleware from "./middleware/authMiddleware.js"

import College from "./models/CollageTask.js" 

dotenv.config();
const app = express();

app.use(cors());

connectDB();

app.use(express.json());

app.use("/admin", Adminroute);
app.use("/user", UserRoutes);
app.use("/superadmin", SuperAdminRoutes);
app.use("/task",AuthMiddleware, TaskRoutes);


// Ensure indexing if not already created
(async () => {
  try {
    // Get all current indexes
    const existingIndexes = await College.collection.getIndexes();
    
    // Check if CollegeTaskname index exists
    if (!('CollegeTaskname_1' in existingIndexes)) {
      console.log("Index on CollegeTaskname not found. Creating...");

      // Create the index manually
      await College.collection.createIndex({ CollegeTaskname: 1 }, { unique: true });

      console.log("Index on CollegeTaskname created successfully.");
    } else {
      console.log("Index on CollegeTaskname already exists.");
    }

    // Optional: check and create other indexes
    if (!('collegeId_1' in existingIndexes)) {
      console.log("Index on collegeId not found. Creating...");
      await College.collection.createIndex({ collegeId: 1 });
    }

  } catch (err) {
    console.error("Index check or creation error:", err);
  }
})();


app.listen(process.env.PORT, () => {
  console.log( `Server running on port ${process.env.PORT}`);
});