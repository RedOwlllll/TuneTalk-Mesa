const express = require('express') 
const router = express.Router()
const Post = require('../../models/post');
const User = require('../../models/UserDetails');

// Endpoint to comment an existing post

router.post('/postsongs/comment', async (req, res) => {
    const { postId, commentusername, commentbody, commentrating } = req.body;
    try {
        let userPostSong = await Post.findById({ _id: postId }).populate('owner');
        if (!userPostSong) {
            return res.status(404).send('Song not found');
        }

        // No existing comment from this user, add new
        userPostSong.comments.push({ commentusername, commentbody, commentrating, date: new Date() });
        await userPostSong.save(); // Save the updated song document
        console.log('Comment added to post:', userPostSong);

        // Add notification to the post owner
        if (userPostSong.owner) {
            const owner = await User.findById(userPostSong.owner._id);
            owner.notifications.push({
                message: `Your post has a new comment from ${commentusername}`,
                date: new Date()
            });
            await owner.save();
        }

        res.json({ 
            userPostSong, 
            notificationMessage: `Your post has a new comment from ${commentusername}`
        });
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