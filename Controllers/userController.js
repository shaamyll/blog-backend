const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')


//Register
exports.registerAPI = async(req,res)=>{
    console.log("Inside Register API");
    const {username,email,password} = req.body
    const existingUser = await users.findOne({email})

    if(existingUser){
        res.status(402).json({message:"User Already Existing"})
    } else {
        const newUser = new users({
            username:username,
            email:email,
            password:password
        })

        await newUser.save()
        res.status(200).json("Register Successfull..")
    }
    
}


exports.loginAPI = async(req,res)=>{
    console.log("Inside Login API");
    const {email,password} = req.body

    const existingUser = await users.findOne({email,password})

    if(existingUser){

        const token = jwt.sign({userId:existingUser._id},process.env.jwtKey)
        res.status(200).json({currentUser:existingUser,token})
    } else{
        res.status(402).json("Invalid user Details")
    }
    
}


exports.editProfileAPI = async(req,res) =>{
    const userId = req.payload
    const {username,email,password,bio,profilePic} = req.body
    const updatedImage = req.file ? req.file.filename : profilePic

    try{
        const profile = await users.findByIdAndUpdate({_id:userId},
            {
                username:username,
                email:email,
                password:password,
                bio:bio,
                profilePic:updatedImage
            }
        )
        await profile.save()
        res.status(200).json(profile)
    }
    catch(err){
        res.status(406).json(err)
    }
}


exports.getUserDetailsAPI=async(req,res)=>{
    const userId = req.payload

    try{
        const response = await users.findOne({_id:userId})
        res.status(200).json(response)
    }
    catch(err){
        res.status(406).json(err)
    }
}
