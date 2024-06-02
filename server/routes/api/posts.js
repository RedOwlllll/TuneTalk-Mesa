const express = require('express') 
const router = express.Router()

const 
{
    getAllPosts,
    createPost,
    getUserPosts
} = require('../../controllers/postController')

router.get('/getallpost', getAllPosts)
router.get('/getuserpost', getUserPosts)

// router.get('/', getAllPosts)

// router.get('/:id', getPost)

router.post('/', createPost)

module.exports = router