const express = require('express') 
const router = express.Router()
const Post = require('../../models/post')
const 
{
    getAllPosts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    deleteAllPosts
} = require('../../controllers/postController')


router.get('/', getAllPosts)

router.get('/:id', getPost)

router.post('/', createPost)

router.delete('/:id', deletePost)

//Commented out for security
router.delete('/', deleteAllPosts)

router.patch('/:id', updatePost)




module.exports = router