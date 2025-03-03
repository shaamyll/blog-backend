const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    image:{
        type:String,
        required:true
    },
      title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    postedDate:{
        type:String
    },
    visibility:{
        type:String
    },
    username:{
        type:String
    }
})

const posts = mongoose.model('posts',postSchema)
module.exports = posts