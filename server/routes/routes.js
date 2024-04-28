const express = require('express');
const router = express.Router();
const SongPost = require('../models/songPost');
const UserDetails = require('../models/userDetails');


//post endpoint to create a song post
router.post('/user/:email/addPost', async (req, res) => {
    try {
      const { email } = req.params;
      const songData = req.body;
  
      // Find the user by their unique email
      const user = await UserDetails.findOne({ email: email });
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Create a new SongPost document
      const newSongPost = new SongPost({
        ...songData,
        userId: user._id, // associate the post with the user's ObjectId
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
// router.post('/user/:userId/addSongPost', async (req, res) => {

//     const {userId} = req.params;


//     try{

//     const user = await UserDetails.findOne({userId: userId});

//     if(!user){
//         return res.status(404).json({ message: "User not found"});
//     }
//    // const { title, artist, albumCover, comments, rating } = req.body;

//     //

//     //create a new songpost instance
//     const newSongPost = new SongPost({
//         userId: user._id,
//         ...songData,
//     });

//     //save the new post to the songpost colletion
//     const savedPost = await newSongPost.save();

//     const user1 = await UserDetails.findById(email);
//     user1.posts.push(savedPost._id);
//     await user.save();

//     // send back a successful response
//     res.status(201).json(savedPost);
//     }catch (error){
//         res.status(500).json({ message: 'Error creating song post', error: error.message});
//     }
// });


//create user
// router.post('/add-user', async (req, res) => {
//     try{
//         //hardcode user details
//         const testUser = new UserDetails({
//             email: 'testuser@example.com',
//             username: 'testuser123',
//             password: 'testpassword',
//             posts: []
//         });

//         //save the test user
//         await testUser.save();

//         //send success response
//         res.status(201).json({ message: "test user created successfully", user: testUser});

//     } catch (error){
//         res.status(500).json({message: "error creating test user", error});
//     } 

// })
// router.get('/user/:email', async (req, res) =>{
//     try{
//         const posts = await SongPost.find({ email: req.params.email}).sort({postedAt: -1})
//         res.status(200).json(posts);
//     } catch (err){
//         res.status(500).json({ message: 'Error fetching posts', err: err.message});
//     }
// })

module.exports = router;