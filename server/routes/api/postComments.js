const express = require('express') 
const router = express.Router()
const Post = require('../../models/post')

// const Song = require('../../models/Song'); 
// const router = express.Router();


router.post('/postsongs/comment', async (req, res) => {
    const { postId, username, comment, rating } = req.body;

    try {
        // Correctly find the document by ID
        let userPostSong = await Post.findById(postId);
        if (!userPostSong) {
            return res.status(404).send('Song not found');
        }

        // Add a new comment to the comments array
        userPostSong.comments.push({
            username, 
            body: comment, 
            rating, 
            date: new Date()
        });

        // Save the updated song document
        let updatedPostSong = await userPostSong.save();
        res.json(updatedPostSong);  // Return the updated document in the response
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding comment and rating');
    }
});


// Endpoint to comment and rate the song
// router.post('/postsongs/comment', async (req, res) => {
//     const { postId, username, comment, rating } = req.body;
//     try {
//         let userPostSong = await Post.findById({ postId });
//         if (!userPostSong) {
//             return res.status(404).send('Song not found');
//         }
        
      
//             // No existing comment from this user, add new
//             userPostSong.comments.push({ username, body: comment, rating, date: new Date() });
        

//         await userPostSong.save(); // Save the updated song document
//         res.json(userPostSong);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error adding comment and rating');
//     }
// });

const createPost = async(req, res) => {
    const {postusername, imageData, email, title, artist, rating, caption} = req.body

    try {
        const post = await Post.create({postusername,imageData, email,title,artist,rating,caption})
        res.status(200).json(post) 
    }   catch (error) {
        res.status(400).json({error: error.message})

    }
    //res.json({mssg: 'POST a new post'})
}

// Endpoint to get comments for a song
router.get('/posts/comments/:spotifyUrl', async (req, res) => {
    try {
        const { spotifyUrl } = req.params;
        const userPostSong = await Post.findOne({ spotifyUrl });
        if (!userPostSong) {
            return res.status(404).send('Song not found');
        }
        res.json({ comments: userPostSong.comments });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching comments');
    }
});

module.exports = router