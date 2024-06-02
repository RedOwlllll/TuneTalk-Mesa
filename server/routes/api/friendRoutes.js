const express = require('express');
const router = express.Router();
const Friend = require('../../models/Friend');
const User = require('../../models/UserDetails');

// Send Friend Request
router.post('/request', async (req, res) => {
    const { requesterUsername, recipientUsername } = req.body;

    // Check if a request already exists between these two users
    const existingRequest = await Friend.findOne({
        $or: [
            { requesterUsername: requesterUsername, recipientUsername: recipientUsername },
            { requesterUsername: recipientUsername, recipientUsername: requesterUsername }
        ],
        status: { $in: ['pending', 'accepted'] } // Check for pending or accepted requests
    });

    if (existingRequest) {
        return res.status(409).send('A request already exists or has already been accepted between these users.');
    }

    if (recipientUsername === requesterUsername) {
        return res.status(400).send("You cannot add yourself as a friend. Go get a life :)");
    }

    // If no existing request, create a new friend request
    const friend = new Friend({
        requesterUsername,
        recipientUsername,
        status: 'pending'
    });

    await friend.save();
    res.status(201).send('Friend request sent');
});

// Accept or Decline Friend Request
router.put('/response', async (req, res) => {
    const { friendId, status } = req.body; // status could be 'accepted' or 'declined'
    try {
        await Friend.findByIdAndUpdate(friendId, { status });
        res.send(`Friend request ${status}`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// List Friends
router.get('/list/:username', async (req, res) => {
    try {
        const { username } = req.params;
        
        // Find friends where the current user is either the requester or recipient and the status is 'accepted'
        const friendsRelationships = await Friend.find({
            $or: [
                { requesterUsername: username, status: 'accepted' },
                { recipientUsername: username, status: 'accepted' }
            ]
        });

        // Extract usernames from the relationships - if the requester is the user, pick the recipient, and vice versa
        const usernames = friendsRelationships.map(fr => 
            fr.requesterUsername === username ? fr.recipientUsername : fr.requesterUsername
        );

        // Fetch UserDetails for these usernames, selecting only the username and profile image fields
        const friendsProfiles = await User.find({ username: { $in: usernames } }).select('username profileImage');

        // Respond with the user details of friends
        res.json(friendsProfiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// New route to list pending friend requests
router.get('/requests/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const pendingRequests = await Friend.find({
            recipientUsername: username,
            status: 'pending'
        });
        res.json(pendingRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Remove a friend relationship
router.delete('/remove', async (req, res) => {
    const { userId, friendId } = req.body;
    try {
        await Friend.findOneAndDelete({
            $or: [
                { requesterUsername: userId, recipientUsername: friendId },
                { requesterUsername: friendId, recipientUsername: userId }
            ]
        });
        res.status(200).send("Friendship removed");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search for users
router.get('/search/:username', async (req, res) => {
    try {
        const { username } = req.params;
        // Regex for case-insensitive partial match
        const users = await User.find({
            username: { $regex: username, $options: "i" }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;