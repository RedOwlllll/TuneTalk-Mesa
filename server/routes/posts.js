const express = require('express') 
const router = express.Router()
const Post = require('../models/post')




router.get('/', (req, res) => {
    res.json({mssg: 'GET a new post'})


})

router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a specific new post'})


})

router.post('/', async (req, res) => {
    const {username, email, title, artist, rating} = req.body

    try {
        const post = await Post.create({username,email,title,artist,rating})
        res.status(200).json(post)
    }   catch (error) {
        res.status(400).json({error: error.message})

    }


    res.json({mssg: 'POST a new post'})


})



router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a post'})


})




module.exports = router