const mongoose = require('mongoose')

/**
 * - Job description Schema : String
 * - Resume text : String
 * - Self description : String
 * - MatchScore : Number
 * 
 * - Technical questions : 
 *      [{
 *          questions : "",
 *          intentions : "",
 *          answer : "",
 *      }]
 * 
 * - Behavioral questions : 
 *      [{
 *          questions : "",
 *          intentions : "",
 *          answer : "",
 *      }]
 * 
 * - Skill gap : [{
 *      skill : "",
 *      sererity :{
 *          type : String,
 *          enum : ["low", "medium", "high"]
 * }
 * }]
 * 
 * - Prepairation Plan : [{
 *          day : number,
 *          focus : String,
 *          tasks : [String]
 * }]
 */
const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "answer is required"]
    }
},{
    _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
     question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "answer is required"]
    }
},{
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "severity is required"]
    }
},{
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "day is required"]
    },
    focus: {
        type: String,
        required: [true, "focus is required"]
    },
    tasks: [{
        type: String,
        required: [true, "Task is required"]
    }]
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type: String,
        required: [true, "job description is required"]
    },
    resume:{
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema]

},{
    timestamps: true
})

const interviewReportModel = mongoose.model("interviewReport", interviewReportSchema)

module.exports = interviewReportModel