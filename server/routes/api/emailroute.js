const express = require('express');
const router = express.Router();
const UserDetails = require('../../models/UserDetails');
const { SendNotificationEmail } = require('../../utils/SendEmailNotification');

router.get('/email', async(req, res) => {
    try{
        const { email } = req.query; // Extract email from query parameters
        const user = await UserDetails.findOne({ email }); // Find user by email
        if(!user)
        {
            return res.status(404).json({error: "User not found"});
        }

        //Send notification email
        SendNotificationEmail(user);

        // Respond with user's email
        res.json({ email: user.email })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;