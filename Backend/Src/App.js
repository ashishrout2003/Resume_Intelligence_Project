const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
app.use(express.json())
app.use(cookieParser())


/* Require all the routes here */
const authRouter = require('./Routes/Auth.routes')


/* Using all the Router here */
app.use('/api/auth', authRouter)


module.exports = app;