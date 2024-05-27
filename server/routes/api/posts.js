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
router.post('/', createPost)

module.exports = router