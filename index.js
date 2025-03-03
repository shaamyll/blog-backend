
require('dotenv').config()

//IMPORT
const express = require('express')
const cors = require('cors')
const db = require('./DB/connection')
const router = require('./Routes/router')

//Create application using express
const blogServer = express()

//USE
blogServer.use(cors())
blogServer.use(express.json())

blogServer.use(router)


blogServer.use('/uploads',express.static('./uploads'))


const PORT = 3000 || process.env.PORT



//RUn the server
blogServer.listen(PORT,()=>{
    console.log("BlogServer is running on the PORT"+PORT);
    
})

blogServer.get('/',(req,res)=>{
    console.log("Welcome to BlogServer");
    res.send("Welcome to BlogServer")
})

