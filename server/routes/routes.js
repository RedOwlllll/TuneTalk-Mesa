const express = require('express');
const router = express.Router();
const {SongPost} = require('../models/songPost');
const UserDetails1 = require('../models/userDetails1');
const { default: mongoose } = require('mongoose');


//post endpoint to create a song post
router.post('/user/:identifier/addPost', async (req, res) => {
  const { identifier } = req.params;
  const postDetails = req.body; // Ensure you're sending post details in the body of your request

  try {
      const user = await User.findOne({
          $or: [{ email: identifier }, { username: identifier }]
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

  router.post('/:identifier/save-caption', async (req, res) => {
    const { identifier } = req.params;
    const { caption } = req.body;

    try{ 
    const userDetails = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }]
      });
  
      if (!userDetails) {
        return res.status(404).send('User not found');
      }

    //Creating a new caption instance with the provided caption
    const newCaption = new Caption({ caption });
    
    //Save the new caption to the database
    const savedCaption = await newCaption.save();

    //Pushing the new caption reference to the user's caption array
    userDetails.caption.push(newCaption);

    await userDetails.save();

    } catch (error){
        console.log("Error saving the caption: ", error);
        res.status(200).send(error.message);
    }
});

module.exports = router;