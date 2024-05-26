const Post = require('../models/post')
const mongoose = require('mongoose')
const User = require('../models/UserDetails');
const Friend = require('../models/Friend');

//get all posts
const getAllPosts = async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: 'Username required' });
    }

    try {
        // Fetch friends where the current user is either the requester or the recipient and the status is 'accepted'
        const friends = await Friend.find({
            $or: [
                { requesterUsername: username, status: 'accepted' },
                { recipientUsername: username, status: 'accepted' }
            ]
        });

        // Extract usernames from both sides of each friendship
        const friendUsernames = new Set();
        friends.forEach(friend => {
            friendUsernames.add(friend.requesterUsername);
            friendUsernames.add(friend.recipientUsername);
        });

        console.log(friendUsernames)
        // Remove the current user's username from the set
        friendUsernames.delete(username);

        // Convert the Set back to an array for the database query
        const friendList = Array.from(friendUsernames);

        console.log(friendList)
        // Fetch posts made by friends
        const posts = await Post.find({ 'postusername': { $in: friendList } }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//create new post
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


module.exports = {
    getAllPosts,
    createPost
}
