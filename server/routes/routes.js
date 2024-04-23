const express = require('express');
const router = express.Router();
const SongPost = require('../models/songPost');
const UserDetails = require('../models/userDetails');

//post endpoint to create a song post
router.post('/', async (req, res) => {
    try{
        //const { userId, title, artist, albumCover, comments, rating } = req.body;
        // const newSongPost = await SongPost.create({
        //     userId,
        //     song: { title, artist, albumCover},
        //     comments,
        //     rating
        const newSongPost = new SongPost(req.body);
        const savedPost = await newSongPost.save();
        res.status(201).json(newSongPost);
        //});

       // await newSongPost.save();

        
    } catch (err){
        res.status(500).json({ message: 'Error creating song post', err});
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