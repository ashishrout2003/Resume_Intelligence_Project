require('dotenv').config()
const app = require('./Src/App')
const connectDB = require('./Src/Config/Database')


connectDB()

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
    
})