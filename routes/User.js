import express from 'express'
const router = express.Router();
import  {
  userregister ,userlogin
} from   "../controllers/user.controller.js"

router.post("/register",  userregister);
router.post("/login", userlogin);

export default router