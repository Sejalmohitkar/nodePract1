import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./config.js"
import Adminroute from "./routes/Admin.js"
import UserRoutes from  "./routes/User.js"
import SuperAdminRoutes from "./routes/SuperAdmin.js"

dotenv.config();
const app = express();

app.use(cors());

connectDB();

app.use(express.json());

app.use("/admin", Adminroute);
app.use("/user", UserRoutes);
app.use("/superadmin", SuperAdminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});