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




router.get('/postsongs/comments/:id', async (req, res) => {
    try {
        const postId = req.params.id;  
        const userPostSong = await Post.findOne({ _id: postId });  
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