const express = require('express');
const router = express.Router();
const { SongPost } = require('../models/songPost');
const User = require('../models/UserDetails'); // Ensure this correctly imports the User model

// POST endpoint to create a song post
router.post('/user/:identifier/addPost', async (req, res) => {
  const { identifier } = req.params;
  const songData = req.body; // Ensure you're sending song details in the body of your request

  try {
    const userDetails = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    if (!userDetails) {
      return res.status(404).send('User not found');
    }

    // Create a new SongPost document
    const newSongPost = new SongPost({
      ...songData,
      userId: userDetails._id, // associate the post with the user's ObjectId
    });

    // Save the new song post
    const savedSongPost = await newSongPost.save();

    // Add the song post's id to the user's posts array
    userDetails.posts.push(savedSongPost._id);

    // Save the updated user document
    await userDetails.save();

    res.status(201).json(savedSongPost);
  } catch (error) {
    console.error('Error saving the song post:', error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
