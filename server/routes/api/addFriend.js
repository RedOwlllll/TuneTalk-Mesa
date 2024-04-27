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
            console.log('Requester not found');
            return res.status(404).json({ error: "Requester user not found." });
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

router.get("/pending/:email", async (req, res) => {
    const { email } = req.params;

    try {
        // Find the user by email
        const user = await UserDetails.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Find all pending friend requests for the user
        const pendingRequests = await Friendship.find({
            recipient: user._id,
            status: "pending"
        }).populate({
            path: 'requester', // Select the 'name' field of the user
            select: 'displayName',
            model: 'UserDetails' // Explicitly stating the model to use for populating
        });
        // Log the populated data here
        console.log("Populated Requester: ", pendingRequests.map(req => req.requester));

        res.status(200).json({ pendingRequests });
    } catch (error) {
        console.error('Error fetching pending friend requests:', error);
        res.status(500).json({ error: "An error occurred while fetching pending friend requests." });
    }
});

module.exports = router;