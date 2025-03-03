const posts = require('../Models/postSchema')

exports.addPostAPI = async(req,res)=>{
    console.log("Inside addpost API");

    const {title,description,postedDate,visibility,username} = req.body
    const image = req.file.filename
    const userId = req.payload

    try{
        const existingPost = await posts.findOne({title})

        if(existingPost){
            res.status(200).json("Project alreadt exists")
        } else {
            const newPost = new posts({image,title,description,postedDate,visibility,userId,username})

            await newPost.save()
            res.status(200).json(newPost)
        }
    }
    catch(err){
        res.status(400).json(err)
    }
}



exports.getUserBlogsAPI = async(req,res) =>{
    console.log("Inside getUserBlogs API");
    const userId = req.payload

    try{
        const userBlogs = await posts.find({ userId })
        res.status(200).json(userBlogs)
    }
    catch(err){
        res.status(400).json(err)
    }
}


exports.deleteBlogAPI = async(req,res) =>{
    console.log("Inside Delete Blog");
    const { blogId }= req.params

    try{
        const blog = await posts.findByIdAndDelete({_id:blogId})
        res.status(200).json(blog)
    }
    catch(err){
        res.status(406).json(err)
    }
    
}

exports.getAllBlogsAPI = async(req,res)=>{
    console.log("Inside AllBlogs");
    const userId = req.payload

    const searchKey = req.query.search
    const query = {
        $or: [
            { title: { $regex: searchKey, $options: "i" } }, 
            { username: { $regex: searchKey, $options: "i" } } 
        ],
        visibility:"public"
    }

    try {
        const allBlogs = await posts.find(query)
        res.status(200).json(allBlogs)
    }
    catch(err){
        res.status(406).json(err)
    }
    
}


exports.editBlogAPI = async(req,res) =>{
    console.log("Inside edit Profile");
    
    const {blogId} = req.params
    const {title,description,visibility,image} = req.body
    const updatedImage = req.file ? req.file.filename : image

    try{
        const updatedBlog = await posts.findByIdAndUpdate({_id:blogId},
            {
                title:title,
                description:description,
                visibility:visibility,
                image:updatedImage
            }
        )
        await updatedBlog.save()
        res.status(200).json(updatedBlog)
    }
    catch(err){
        res.status(406).json(err)
    }
}

exports.getBlogByID = async(req,res)=>{
    const {blogId} = req.params

    try{
        const response = await posts.findOne({_id:blogId})
        res.status(200).json(response)
    }
    catch(err){
        res.status(406).json(err)
    }
}


//Get three Blogs
exports.getThreeBlogsAPI = async(req,res)=>{
    console.log("Inside AllBlogs");

    try {
        const response = await posts.find().limit(3)
        res.status(200).json(response)
    }
    catch(err){
        res.status(406).json(err)
    }
    
}
