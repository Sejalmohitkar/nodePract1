// const User = require("../models/Adddata.js");
import Adminregister from "../models/AdminRegister.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const adminregister = async (req, res) => {
  try {
     const {username, name, email, password, age}  = req.body;
     const exitanceUser = await Adminregister.findOne({email});
     if(exitanceUser){
      res.status(400).json({
        success : false,
        message : "email already exist",
      })
     }
     const salt = 10;
     const hashedPassword = await bcrypt.hash(password, salt);
     const newUser = new Adminregister({ name, email, username, password: hashedPassword, age });
     const saveData = await newUser.save();
      res.status(201).json({
      success: true,
      message: "Admin create Succesfully",
      data: saveData,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const adminlogin = async(req, res) => {
  try {
    const {email, password} = req.body;
    const user = await Adminregister.findOne({email: email })
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
