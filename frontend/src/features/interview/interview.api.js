import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const generateInterviewReport = async({jobDescription,selfDescription,resumeFile})=>{
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);
    const response = await axios.post(
       `${API_URL}/api/interview/`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        }
    );
    return response.data;
}

export const getInterviewById = async (interviewId) => {
    try{
        const response = await axios.get(
            `${API_URL}/api/interview/report/${interviewId}`,
            { withCredentials: true },
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching interview by ID:", error);
        throw error;
    }
}

export const getAllInterviews = async () => {
    try{
        const response = await axios.get(
            `${API_URL}/api/interview/reports`,
            { withCredentials: true },
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching all interviews:", error);
        throw error;
    }
}
