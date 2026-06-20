import { generateInterviewReport,getInterviewById,getAllInterviews } from "./interview.api.js";
import { InterviewContext } from "./interview.context.jsx";
import { use, useContext } from "react";

export const useInterview = ()=>{
    const context = useContext(InterviewContext);
    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider");
    }
    const {loading, setLoading, report, setReport, reports, setReports} = context;

    const handleReportGeneration = async({jobDescription,selfDescription,resumeFile})=>{
        setLoading(true);
        try{
            const response = await generateInterviewReport({jobDescription,selfDescription,resumeFile});
            setReport(response.interviewReport);
            return response.interviewReport;
        } catch (error) {
            console.error("Error generating interview report:", error);
        } finally {
            setLoading(false);
        }
    }

    const fetchReportById = async (interviewId) => {
        setLoading(true);
        try {
            const response = await getInterviewById(interviewId);
            setReport(response.interviewReport);
        } catch (error) {
            console.error("Error fetching interview report by ID:", error);
        } finally {
            setLoading(false);
        }
    }

    const fetchAllReports = async () => {
        setLoading(true);
        try {
            const response = await getAllInterviews();
            setReports(response.interviewReports);
        } catch (error) {
            console.error("Error fetching all interview reports:", error);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        report,
        reports,
        handleReportGeneration,
        fetchReportById,
        fetchAllReports,
    }
}