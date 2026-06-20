import Report from "../models/report.model.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
import { generateInterviewReport } from "../services/ai.service.js";

export const generateReport = async (req, res) => {
    try {
        const resumeFile = req.file
        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
        const { selfDescription, jobDescription } = req.body;
        const interviewResponseByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
        })
        const interviewReport = await Report.create({
            user:req.user.id,
            resume:resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewResponseByAi //destructuring
        })
        res.status(201).json({
            message:"Interview report generated successfully",
            interviewReport
        })

    } catch (err) {
        console.log("Error in generating report", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getReportById = async (req, res) => {
    try{
        const {interviewId} = req.params;
        const interviewReport = await Report.findOne({
            _id:interviewId,
            user:req.user.id
        })
        if(!interviewReport){
            return res.status(404).json({ message: "Report not found" });
        }
        res.status(200).json({
            message:"Report fetched successfully",
            interviewReport
        })

    }catch(err){
        console.log("Error in fetching report", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllReports = async (req, res) => {
    try{
        const interviewReports = await Report.find({
            user:req.user.id
        }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillgaps -preparationPlans")
         // Exclude resume content for listing
         res.status(200).json({
            message:"Reports fetched successfully",
            interviewReports
        })
    }catch(err){
        console.log("Error in fetching reports", err);
        res.status(500).json({ message: "Internal server error" });
    }
}