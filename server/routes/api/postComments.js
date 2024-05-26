const express = require('express') 
const router = express.Router()
const Post = require('../../models/post')


// Endpoint to comment an existing post

router.post('/postsongs/comment', async (req, res) => {
    const { postId, commentusername, commentbody, commentrating } = req.body;
    try {
        let userPostSong = await Post.findById({ _id: postId });
        if (!userPostSong) {
            return res.status(404).send('Song not found');
        }


            // No existing comment from this user, add new
            userPostSong.comments.push({ commentusername, commentbody, commentrating, date: new Date() });
            

        await userPostSong.save(); // Save the updated song document
        res.json(userPostSong);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding comment and rating');
    }
});




// // Endpoint to get comments for a post
// router.get('/postsongs/comments/:id', async (req, res) => {
//     try {
//         const { id: postId } = req.params.id; // Corrected from _id to id to match the route parameter
//         const userPostSong = await Post.findOne({ id: postId });
//         if (!userPostSong) {
//             return res.status(404).send('Song not found');
//         }
//         res.json({ comments: userPostSong.comments });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error fetching comments');
//     }
// });

router.get('/postsongs/comments/:id', async (req, res) => {
    try {
        const postId = req.params.id;  // Correct way to get id from params
        const userPostSong = await Post.findOne({ _id: postId });  // Use _id for querying MongoDB
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