import express from 'express'
const router = express.Router();
import  {
  userregister ,userlogin, userresetPass, decodeToken 
} from   "../controllers/user.controller.js"

router.post("/register",  userregister);
router.post("/login", userlogin);
router.post("/resetpassword", userresetPass );
router.get("/decodetoken", decodeToken)

export default router;