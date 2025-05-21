import SuperAdminRegister from '../models/SuperAdmin.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const superadminregister = async (req, res) => {
  try {
     const {username, name, email, password, phone}  = req.body;
     const exitanceUser = await SuperAdminRegister.findOne({email});
     if(exitanceUser){
      res.status(400).json({
        success : false,
        message : "email already exist",
      })
     }
     const salt = 10;
     const hashedPassword = await bcrypt.hash(password, salt);
     const newUser = new SuperAdminRegister({username, name, email,password:hashedPassword, phone});
     const saveData = await newUser.save();
      res.status(201).json({
      success: true,
      message: "SuperAdmin create Successfully",
      data: saveData,
    });
  } catch (error) {
    res.status(500).json({ 
        success : false,
        message: "Internal Server Error",
        error : error.message 
    });
  }
};

export const superadminlogin = async(req, res) => {
  try {
    const {email, password} = req.body;
    const user = await SuperAdminRegister.findOne({email: email })
    if(!user) {
      res.status(401).json({
        success : false,
        message : "Invalid email ",
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch){
      res.status(401).json({
        success : false,
        message : "Invalid password ",
      })
    }

    const payload = {
      email : user.email,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d'});
      return res.status(201).json({
      success : true,
      token 
    });
  } catch (error) {
    return res.status(500).json({
      success : false,
      message : "Error while login",
      error : error.message
    });
  }
};
