import express from "express";
const authRouter = express.Router();
import { registerUser,loginUser,logoutUser, getMe } from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

authRouter.post("/register",registerUser);
authRouter.post("/login",loginUser);
authRouter.get("/logout",logoutUser);
authRouter.get("/get-me",authUser,getMe)

export default authRouter;