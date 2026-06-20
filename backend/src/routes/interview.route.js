import express from 'express';
const interviewRouter = express.Router();
import { authUser } from '../middlewares/auth.middleware.js';
import { generateReport,getAllReports,getReportById } from '../controllers/interview.controller.js';
import { upload } from "../middlewares/file.middleware.js";
import { get } from 'mongoose';

interviewRouter.post("/",authUser,upload.single("resume"),generateReport)
interviewRouter.get("/report/:interviewId",authUser,getReportById)
interviewRouter.get("/reports",authUser,getAllReports)

export default interviewRouter;
