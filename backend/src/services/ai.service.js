import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const interviewReportSchema = z.object({
  matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's resume and self-description match the job description."),
  technicalQuestions: z.array(z.object({
    question: z.string().describe("The technical question asked during the interview."),
    intention: z.string().describe("The intention of interviewer behind the question."),
    answer: z.string().describe("How to answer a question,the approach .A sample answer to the technical question."),
  })).describe("An array of technical questions that were asked during the interview, along with the interviewer's intention and a sample answer for each question."),
  behavioralQuestions: z.array(z.object({
    question: z.string().describe("The behavioral question asked during the interview."),
    intention: z.string().describe("The intention of interviewer behind the question."),
    answer: z.string().describe("How to answer a question,the approach .A sample answer to the behavioral question."),
  })).describe("An array of behavioral questions that were asked during the interview, along with the interviewer's intention and a sample answer for each question."),
  skillgaps: z.array(z.object({
    skill: z.string().describe("The skill that the candidate is lacking based on the job description and resume analysis."),
    severity: z.enum(["low", "medium", "high"]).describe("The severity level of the skill gap, indicating how critical it is for the candidate to address this gap."),
  })).describe("An array of skill gaps identified for the candidate, including the specific skill and its severity level."),
  preparationPlans: z.array(z.object({
    day: z.number().describe("The day number in the preparation plan, indicating the sequence of the preparation steps."),
    focus: z.string().describe("The main focus or topic for that day of preparation, such as a specific technical skill, behavioral aspect, or interview strategy."),
    tasks: z.array(z.string()).describe("A list of specific tasks or activities that the candidate should complete on that day to effectively prepare for the interview."),
  })).describe("A day wise preparation plan for the candidate, outlining the focus and specific tasks for each day leading up to the interview."),
  title: z.string().describe("The title of the job position the candidate is applying for."),
});

// Build the JSON schema using Zod v4's built-in method (zod-to-json-schema is NOT compatible with Zod v4)
const responseSchema = z.toJSONSchema(interviewReportSchema);

// Reorder parsed output to exactly match interviewReportSchema field order
function enforceOutputOrder(raw) {
  return {
    matchScore: raw.matchScore,
    technicalQuestions: (raw.technicalQuestions ?? []).map(q => ({
      question: q.question,
      intention: q.intention,
      answer: q.answer,
    })),
    behavioralQuestions: (raw.behavioralQuestions ?? []).map(q => ({
      question: q.question,
      intention: q.intention,
      answer: q.answer,
    })),
    skillgaps: (raw.skillgaps ?? []).map(s => ({
      skill: s.skill,
      severity: s.severity,
    })),
    preparationPlans: (raw.preparationPlans ?? []).map(p => ({
      day: p.day,
      focus: p.focus,
      tasks: p.tasks,
    })),
    title: raw.title,
  };
}

export async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
  const prompt = `Generate an interview report for a candidate based on the following information:
  Resume: ${resume}
  Self-Description: ${selfDescription}
  Job-Description: ${jobDescription}`;

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });  

    const parsed = JSON.parse(response.text);
    const ordered = enforceOutputOrder(parsed);
    // console.log(JSON.stringify(ordered, null, 2));
    return ordered;
  } catch (error) {
    console.error("[AI Service Error]", error.status ?? "", error.message ?? error);
  }
}
