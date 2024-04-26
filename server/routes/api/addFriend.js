const express = require("express");
const router = express.Router();
const UserDetails = require("../../models/UserDetails"); // Path to your UserDetails model
const Friendship = require("../../models/Friendship"); // Path to your Friendship model

router.post("/", async (req, res) => {
    
    const { requesterEmail, recipientEmail } = req.body;
    try {
        console.log('Attempting to find recipient:', recipientEmail);
        // Find the recipient user by email
        const [requester, recipient] = await Promise.all([
            UserDetails.findOne({ email: requesterEmail }),
            UserDetails.findOne({ email: recipientEmail })
        ]);

        // Test to see what are the context || Can delete
        console.log("addFriend endpoint hit", req.body);
        console.log('requesterEmail:', requesterEmail);
        console.log('recipientEmail:', recipientEmail);

        if (!recipient) {
            console.log('Recipient not found');
            return res.status(404).json({ error: "Recipient user not found." });
        }

        if (!requester) {
            console.log('Recipient not found');
            return res.status(404).json({ error: "Recipient user not found." });
        }

        console.log('Attempting to create friendship');
        // Create a new Friendship document
        const newFriendship = new Friendship({
            requester: requester._id,
            recipient: recipient._id
        });

        console.log('Attempting to save friendship');
        await newFriendship.save();

        console.log('Friend request saved successfully');
        res.status(201).json({ message: "Friend request sent." });

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: "An error occurred while adding a friend." });
    }
});

module.exports = router;