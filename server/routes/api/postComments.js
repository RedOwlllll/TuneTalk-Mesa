const express = require('express') 
const router = express.Router()
const Post = require('../../models/post')

// const Song = require('../../models/Song'); 
// const router = express.Router();





// Endpoint to comment and rate the song
router.post('api/songs/comment', async (req, res) => {
    const { postId, username, comment, rating } = req.body;
    try {
        let userPostSong = await Post.findById({ postId });
        if (!userPostSong) {
            return res.status(404).send('Song not found');
        }
        
        // Check if the user has already commented
        const existingCommentIndex = userPostSong.comments.findIndex(c => c.username === username);
        if (existingCommentIndex !== -1) {
            // User has commented before, update the existing comment
            userPostSong.comments[existingCommentIndex].body = comment;
            userPostSong.comments[existingCommentIndex].rating = rating;
            userPostSong.comments[existingCommentIndex].date = new Date(); // Update the date of the comment
        } else {
            // No existing comment from this user, add new
            userPostSong.comments.push({ username, body: comment, rating, date: new Date() });
        }

        await userPostSong.save(); // Save the updated song document
        res.json(userPostSong);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding comment and rating');
    }
});

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