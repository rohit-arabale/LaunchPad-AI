import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Blacklist from "../models/blacklist.model.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });
    await newUser.save();
    const token = jwt.sign(
      {
        id: newUser._id,
        username: newUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
    });

    res.status(201).json({ 
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      }
     });
  } catch (err) {
    console.log("Error in registering user", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
    });
    res.status(200).json({
      message: "User logged in succesfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.log("Error in logging in user", err);
    res.status(500).json({ message: "Error while logging in the user" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (token) {
      await Blacklist.create({ token });
    }
    res.clearCookie("token");
    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (err) {
    console.log("Error in logging out user", err);
    res.status(500).json({ message: "Error while logging out the user" });
  }
};

export const getMe = async(req,res)=>{
    try{
      const user = await User.findById(req.user.id)
      res.status(200).json({
        message: "User details fetched successfully",
        user:{
          id: user._id,
          username: user.username,
          email: user.email,
        }
      })
    }catch(err){
        console.log("Error in getting user details", err);
        res.status(500).json({ message: "Error while getting user details" });
    }
}