const express = require('express');
const router = express.Router();
const Friend = require('../../models/Friend');
const User = require('../../models/UserDetails'); // Assuming you have a User model

// Send Friend Request
router.post('/request', async (req, res) => {
    const { requesterEmail, recipientEmail } = req.body;
    const friend = new Friend({
        requesterEmail,
        recipientEmail,
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
router.get('/list/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const friends = await Friend.find({
            $or: [
                { requesterEmail: email, status: 'accepted' },
                { recipientEmail: email, status: 'accepted' }
            ]
        });
        res.json(friends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;