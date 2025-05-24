import express from 'express'
const router = express.Router();
import  {
  userregister ,userlogin, userresetPass 
} from   "../controllers/user.controller.js"

router.post("/register",  userregister);
router.post("/login", userlogin);
router.post("/resetpassword", userresetPass );

export default router