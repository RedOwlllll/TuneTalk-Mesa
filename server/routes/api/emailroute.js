const express = require('express');
const router = express.Router();
const UserDetails = require('../../models/UserDetails');
const { SendNotificationEmail } = require('../../utils/SendEmailNotification');

router.get('/email', async(req, res) => {
    try{
        const { email } = req.query;
        const user = await UserDetails.findOne({ email });
        if(!user)
        {
            return res.status(404).json({error: "User not found"});
        }

        //Send notification email
        SendNotificationEmail(user);

        res.json({ email: user.email })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;