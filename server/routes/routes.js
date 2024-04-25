const express = require('express');
const router = express.Router();
const SongPost = require('../models/songPost');
const UserDetails = require('../models/userDetails');

//post endpoint to create a song post
router.post('/', async (req, res) => {
    try{

    const userId = "";
    const { title, artist, albumCover, comments, rating, postedAt } = req.body;

    //create a new songpost instance
    const newSongPost = new SongPost({
        userId,
        song: {
            title,
            artist,
            albumCover,
        },
        comments: comments || [],
        rating: rating || 0,
        postedAt,
    });

    //save the new post to the songpost colletion
    const savedPost = await newSongPost.save();

    const user = await UserDetails.findById(userId);

    user.posts.push(savedPost._id);

    await user.save();

    // send back a successful response
    res.status(201).json(savedPost);
    }catch (error){
        res.status(500).json({ message: 'Error creating song post', error: error.message});
    }
});

router.get('/user/:userID', async (req, res) =>{
    try{
        const posts = await SongPost.find({ userId: req.params.userId}).sort({postedAt: -1})
        res.status(200).json(posts);
    } catch (err){
        res.status(500).json({ message: 'Error fetching posts', err: err.message});
    }
})

module.exports = router;

