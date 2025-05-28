import Adminregister from "../models/AdminRegister.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";

//register admin
export const adminregister = async (req, res) => {
  try {
    const { username, name, email, password, age } = req.body;
    const exitanceUser = await Adminregister.findOne({ email });
    if (exitanceUser) {
      res.status(400).json({
        success: false,
        message: "email already exist",
      });
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new Adminregister({
      name,
      email,
      username,
      password: hashedPassword,
      age,
    });
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

//login admin
export const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Adminregister.findOne({ email: email });
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email ",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid password ",
      });
    }

    const payload = {
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(201).json({
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while login",
      error: error.message,
    });
  }
};

//reset password
export const adminresetpass = async (req, res) => {
  try {
    const { email, OldPassword, NewPassword, ConfirmPass } = req.body;
    //validation to fields
    if ((!email || !OldPassword || !NewPassword, !ConfirmPass)) {
      return res.status(400).json({
        success: false,
        message: "All fields are requires!",
      });
    }

    const exUser = await Adminregister.findOne({ email });
    if (!exUser) {
      return res.status(404).json({
        success: false,
        Message: "Email not found!",
      });
    }

    const isMatch = await bcrypt.compare(OldPassword, exUser.password);
    if (!isMatch) {
     return res.status(401).json({
        success: false,
        Message: "Invalid OldPassword!",
      });
    }

    if (NewPassword !== ConfirmPass) {
      return res.status(400).json({
        success: false,
        Message: "NewPassword and ConfirmPassword do not match! ",
      });
    }

    const salt = 10;
    const hashPassword = await bcrypt.hash(NewPassword, salt);
    exUser.password = hashPassword;
    await exUser.save();

    return res.status(200).json({
      success: true,
      Message: "Password Reset Successfully!",
      data: hashPassword,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      Message: "Internal Server Error",
      error: error.message,
    });
  }
};

//decode token
export const decodeToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
      return res.status(200).json({
        success: true,
        message: "get superAdmin data",
        data : decoded,
      });
  
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};
