import SuperAdminRegister from "../models/SuperAdmin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const superadminregister = async (req, res) => {
  try {
    const { username, name, email, password, phone } = req.body;

    const exitanceUser = await SuperAdminRegister.findOne({ email });
    if (exitanceUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new SuperAdminRegister({
      username,
      name,
      email,
      password: hashedPassword,
      phone,
    });

    const saveData = await newUser.save();
    return res.status(201).json({
      success: true,
      message: "SuperAdmin created successfully",
      data: saveData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const superadminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await SuperAdminRegister.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email ",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
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

export const superAdminresetPass = async (req, res) => {
  try {
    const { email, OldPassword, NewPassword, ConfirmPassword } = req.body;

    if (!email || !OldPassword || !NewPassword || !ConfirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const exUser = await SuperAdminRegister.findOne({ email });
    // console.log(exUser);
    if (!exUser) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    const isMatch = await bcrypt.compare(OldPassword, exUser.password);
    console.log("if password:", isMatch);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Oldpassword!",
      });
    }

    if (NewPassword !== ConfirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(NewPassword, salt);
    exUser.password = hashedPassword;
    await exUser.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
      data: hashedPassword,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const decodetoken = async (req, res) => {
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

