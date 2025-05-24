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

//reset Password
export const userresetPass = async (req, res) => {
  try {
    const { email, OldPassword, NewPassword, ConfirmPassword } = req.body;

    if (!email || !OldPassword || !NewPassword || !ConfirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const exUser = await  UserRegister.findOne({ email });
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

