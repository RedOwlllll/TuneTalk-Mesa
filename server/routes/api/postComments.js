const express = require('express') 
const router = express.Router()
const Post = require('../../models/post')

// const Song = require('../../models/Song'); 
// const router = express.Router();


// Endpoint to comment and rate the song


// router.post('/postsongs/comment', async (req, res) => {
//     const { postId, username, comment, rating } = req.body;

//     try {
//         let userPostSong = await Post.findById(postId);
//         if (!userPostSong) {
//             return res.status(404).send('Song not found');
//         }

//         // Add a new comment to the comments array
//         userPostSong.comments.push({
//             commentusername: username, 
//             commentbody: comment, 
//             commentrating: rating, 
//             date: new Date() 
//         });

//         // Save the updated song document
//         let updatedPostSong = await userPostSong.save();
//         res.json(updatedPostSong);  // Return the updated document in the response
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error adding comment and rating');
//     }
// });

router.post('/postsongs/comment', async (req, res) => {
    const { postId, commentusername, comment, commentrating } = req.body;
    try {
        let userPostSong = await Post.findById({ _id: postId });
        if (!userPostSong) {
            return res.status(404).send('Song not found');
        }


            // No existing comment from this user, add new
            userPostSong.comments.push({ commentusername, commentbody: comment, commentrating, date: new Date() });


        await userPostSong.save(); // Save the updated song document
        res.json(userPostSong);
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