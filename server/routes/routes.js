const express = require('express');
const router = require('express').Router();
const {SongPost} = require('../models/songPost');
const UserDetails1 = require('../models/userDetails1');
const { default: mongoose } = require('mongoose');


//post endpoint to create a song post
router.post('/user/userinfo/addPost', async (req, res) => {
    try {
      const { userData } = req.params;
      const songData = req.body;
  
      console.log(userData.email);
      console.log(userData.username);
      // Find the user by their unique email
      const user = await UserDetails1.findOne({
        $or: [
          {email: userData},
          {username: userData}
        ]
      });
  
      if (!user) {
        return res.status(404).send('User not found');
      }

      // Create a new SongPost document
      const newSongPost = new SongPost({
        ...songData,
        userData: user._id, // associate the post with the user's ObjectId
      });
  
      // Save the new song post
      const savedSongPost = await newSongPost.save();
  
      // Add the song post's id to the user's posts array
      user.posts.push(savedSongPost._id);
  
      // Save the updated user document
      await user.save();
  
      res.status(201).json(savedSongPost);
    } catch (error) {
      console.error('Error saving the song post:', error);
      res.status(500).send(error.message);
    }
  });


module.exports = router;