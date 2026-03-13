const express = require("express")
const authmiddleware = require('../Middlewares/Auth.middleware')
const interviewController = require('../Controllers/Interview.controller')
const upload = require('../Middlewares/File.middleware')

const interviewRouter = express.Router()

/**
 * @route POST /api/interview
 * @description Generate new interview report on the basis of user self description , resume and job description.
 * @access Private
 */

interviewRouter.post('/', authmiddleware.authUser,upload.single("resume"), interviewController.generateInterviewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description Get interview report by interviewId
 * @access Private
 */

interviewRouter.get("/report/:interviewId", authmiddleware.authUser, interviewController.getInterviewReportByIdController)

/**
 * @route GET /api/interview
 * @description get all interview report of logged in user
 * @access private
 */

interviewRouter.get('/', authmiddleware.authUser, interviewController.getAllInterviewReportController)

module.exports = interviewRouter