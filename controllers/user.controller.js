import UserRegister from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userregister = async (req, res) => {
  try {
    const { username, email, name, password, age } = req.body;
    const exitanceUser = await UserRegister.findOne({ email });
    if (exitanceUser) {
      res.status(201).json({
        success: false,
        message: "email already Exist",
      });
    }

    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new UserRegister({
      username,
      email,
      name,
      password: hashPassword,
      age,
    });
    const saveData = await newUser.save();
    res.status(201).json({
      success: true,
      message: "User Register Successfully",
      data: saveData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

export const userlogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserRegister.findOne({username});
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid User Name",
      });
    }

    const PasswordMatch = await bcrypt.compare(password, user.password);
    if (!PasswordMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const payload = {
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(201).json({
      success: true,
      token,
      message: "Login Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while login",
      error: error.message,
    });
  }
};
