const {GoogleGenAI} = require('@google/genai')
const { z, parse } = require('zod')
const { zodToJsonSchema } = require('zod-to-json-schema')


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating the well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc")
    })).min(4).max(5).describe("Technical question that can be asked in the interview along with their intention add how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc")
    })).min(4).max(5).describe("Technical question that can be asked in the interview along with their intention add how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job")
    })).describe("List of skill gaps is the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g.data structure, system design, mock interview"),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book")
    })).min(4).max(5).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
})

async function generateInterviewReport({resume, selfDescription, jobDescription}){

    const prompt = `
You are an expert technical interviewer.

Analyze the candidate profile and generate an interview preparation report.

INPUT DATA

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Job Description:
${jobDescription}

TASK

Generate an interview preparation report strictly following the JSON structure below.

RULES

- Return ONLY valid JSON
- Do NOT include explanations
- Do NOT include markdown
- Do NOT include extra fields
- Follow the schema exactly
- matchScore must be between 0 and 100
- technicalQuestions must contain 4 to 5 questions
- behavioralQuestions must contain 4 to 5 questions
- preparationPlan must contain 4 to 5 days

JSON STRUCTURE

{
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "behavioralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "skillGaps": [
    {
      "skill": string,
      "severity": "low" | "medium" | "high"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": string,
      "tasks": [string]
    }
  ]
}

Return ONLY JSON.
`;
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
            temperature: 0.2
        }
    })
    return JSON,parse(response.text)
    
}

module.exports = generateInterviewReport