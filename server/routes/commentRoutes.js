const express = require('express');
const router = require('express').Router();
const SongPost = require('../models/songPost');
const { sendNotification, pushNotification } = require('../../server/utils/sendNotificationEmail');
const Friend = require('../../server/models/Friend');
const User = require('../../server/models/UserDetails');

//Post comment to a song post
router.post('/songpost/:postId/comments', async (req, res) => {

    try{

    const { postId } = req.params;
    const { text, userId } = req.body; 
  

      const songPost = await SongPost.findOne(postId);
      if (!songPost) {
        return res.status(404).send('Post not found');
      }
      
      const comment = { text, postedBy: userId };
      songPost.comments.push(comment);
      const savedSongPost = await songPost.save();
  
      res.status(201).json(savedSongPost.comments);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


//get comments for a song post
router.get('/songpost/:postId/comments', async (req, res) => {
    const { postId } = req.params;

    try{
        const songPost = await SongPost.findById(postId).populate('comments.postedBy', 'username');

        if(!songPost){
            return res.status(404).send('Post not found');
        }

        res.json(songPost.comments);
    } catch (error){
        res.status(500).send(error.message);
    }
})

module.exports = router;