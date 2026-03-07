const { Router } = require('express')
const authController = require('../Controllers/Auth.controller')
const authMiddleware = require('../Middlewares/Auth.middleware')
const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post('/register', authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @description Login user with email and password
 * @access Public
 */
authRouter.post('/login', authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description Clear token from user cookies and add the token in blacklist
 * @access Public
 */
authRouter.get('/logout', authController.logoutuserController)


/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access Private
 */
authRouter.get('/get-me',authMiddleware.authUser, authController.getMeController)


module.exports = authRouter;