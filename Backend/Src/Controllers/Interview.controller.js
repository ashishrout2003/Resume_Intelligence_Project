const pdfParse = require('pdf-parse')
const generateInterviewReport = require('../Services/Ai.service')
const interviewReportModel = require('../Models/InterviewReport.model')

async function generateInterviewReportController(req, res){

    const resumeContent = await (new pdfParse.PDFParse(Uint16Array.from(req.file.buffer))).getText()
    const {selfDescription, jobDescription} = req.body

    function convertToObjects(arr, keys) {
  const result = []

  for (let i = 0; i < arr.length; i += keys.length * 2) {
    const obj = {}

    for (let j = 0; j < keys.length; j++) {
      let value = arr[i + j * 2 + 1]

      // Special fix for tasks
      if (keys[j] === "tasks" && typeof value === "string") {
        value = value.split(",").map(task => task.trim())
      }

      obj[keys[j]] = value
    }

    result.push(obj)
  }

  return result
}
    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
    })

// FIX STRUCTURE
interviewReportByAi.technicalQuestions = convertToObjects(
  interviewReportByAi.technicalQuestions,
  ["question", "intention", "answer"]
)

interviewReportByAi.behavioralQuestions = convertToObjects(
  interviewReportByAi.behavioralQuestions,
  ["question", "intention", "answer"]
)

interviewReportByAi.skillGaps = convertToObjects(
  interviewReportByAi.skillGaps,
  ["skill", "severity"]
)

interviewReportByAi.preparationPlan = convertToObjects(
  interviewReportByAi.preparationPlan,
  ["day", "focus", "tasks"]
)
    

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })
    res.status(201).json({
        message: "Interview report generate successfullt",
        interviewReport
    })
}

module.exports = {generateInterviewReportController}