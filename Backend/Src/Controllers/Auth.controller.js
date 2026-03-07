const userModel = require('../Models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenBlacklistModel = require('../Models/Blacklist.model')

/**
 * @name registerUserController
 * @description register a new user, exports username, email and password in the requiest
 * @access Public
 */
async function registerUserController(req, res){
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(401).json({
            message: "Provide the username, email and password"
        })
    }
    const isUserAlreadyExist = await userModel.findOne({
        $or: [{username}, {email}]
    })
    if(isUserAlreadyExist){
        return res.status(401).json({
            message: "Account already exist with this username and email"
        })
    }
    const hash = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        username,
        email,
        password: hash
    })
    const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET_KEY,
        {expiresIn: "2d"}
    )
    res.cookie('token', token)
    res.status(201).json({
        message: "User Registered syccessful",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name loginUsercontroller
 * @description Login a user, exports email and password in the requiest
 * @access Public
 */
async function loginUserController(req, res){
    const { email, password } = req.body;
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(401).json({
            message: "Invalid email and password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid email and password"
        })
    }
    const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET_KEY,
        {expiresIn: "2d"}
    )
    res.cookie('token', token)
    res.status(200).json({
        message: "User logged in Successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name logoutUserController
 * @description clear token from user cookie and add the the token in blacklist
 * @access Public
 */
async function logoutuserController(req, res){
const token = req.cookies.token
if(token){
    await tokenBlacklistModel.create({token})
}
res.clearCookie('token')
    res.status(200).json({
        message: "User logged out successfully"
    })

}

/**
 * @router getMeController
 * @description get the current logged in user details 
 */
async function getMeController(req, res){
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User details Fetched successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutuserController,
    getMeController
}