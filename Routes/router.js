const express = require('express')


const userController = require('../Controllers/userController')
const postController = require('../Controllers/postController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerMiddleware = require('../Middlewares/MulterMiddleware')

const router = express.Router()

router.post('/api/register',userController.registerAPI)

router.post('/api/login',userController.loginAPI)

router.post('/api/addPost',jwtMiddleware,multerMiddleware.single('image'),postController.addPostAPI)

router.get('/api/getUserBlogs',jwtMiddleware,postController.getUserBlogsAPI)

router.delete('/api/deleteBlog/:blogId',jwtMiddleware,postController.deleteBlogAPI)

router.get('/api/allBlogs',jwtMiddleware,postController.getAllBlogsAPI)

router.put('/api/editBlog/:blogId',jwtMiddleware,multerMiddleware.single('image'),postController.editBlogAPI)

router.get('/api/viewBlog/:blogId',jwtMiddleware,postController.getBlogByID)

//Edit Profile
router.put('/api/editProfile',jwtMiddleware,multerMiddleware.single('profilePic'),userController.editProfileAPI)

router.get('/api/getUserDetails',jwtMiddleware,userController.getUserDetailsAPI)

router.get('/api/getThreeBlog',jwtMiddleware,postController.getThreeBlogsAPI)

module.exports = router