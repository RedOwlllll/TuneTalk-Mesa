const post = require('../models/post')
const Post = require('../models/post')
const mongoose = require('mongoose')

//get all posts
const getAllPosts = async (req, res) => {
    const posts = await Post.find({}).sort({createdAt: -1})

    res.status(200).json(posts)
}


//get a single post
const getPost = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such post'})
    }

    const post = await Post.findById(id)

    if (!post) {
        return res.status(404).json({error:'no such post'})
    }
    else 

    res.status(200).json(post)
}


//create new post
const createPost = async(req, res) => {
    const {postusername, imageData, email, title, artist, rating, caption} = req.body

    try {
        const post = await Post.create({postusername,imageData, email,title,artist,rating,caption})
        res.status(200).json(post) 
    }   catch (error) {
        res.status(400).json({error: error.message})

    }
    //res.json({mssg: 'POST a new post'})
}


//delete a post
const deletePost = async (req, res) => {

    
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such post'})
    }

    const post = await Post.findOneAndDelete({_id:id})
    
    if (!post) {
        return res.status(400).json({error:'no such post'})
    }

    res.status(200)
}

const deleteAllPosts = async (req, res) => {

    await Post.deleteMany({});
    res.status(200).json(Post)
}



//update a post
const updatePost = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such post'})
    }

    const post = await Post.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!post) {
        return res.status(400).json({error:'no such post'})
    }

    res.status(200).json(post)
}

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    deletePost,
    deleteAllPosts,
    updatePost
    
}
