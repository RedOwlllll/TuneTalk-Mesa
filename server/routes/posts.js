const express = require('express') 
const router = express.Router()
const Post = require('../models/post')
const 
{
    getAllPosts,
    getPost,
    createPost,
    deletePost,
    updatePost
} = require('../controllers/postController')


router.get('/', getAllPosts)


router.get('/:id', getPost)

router.post('/', createPost)

router.delete('/:id', deletePost)

router.patch('/:id', updatePost)




module.exports = router