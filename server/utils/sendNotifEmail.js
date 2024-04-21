const express = require("express");
const router = express.Router();
const UserEmail = require("../models/UserDetails");
const { NotificationTransporter } = require("./NotificationTransporter");

router.use(express.json());

router.post("/", async (req, res) => {
    const transporter = NotificationTransporter(); //creating mail transporter object
    const {email} = req.body;

    try {
        let userEmail = await UserEmail.findOne({ email }); // fetch the user's details

        if (!userEmail || !userEmail.email) 
        {
            console.log('The user does not exist');
            res.status(404).json({ message: "User not found or email not provided" });
            return; // Exit early if user or user email does not exist
        }

        const mailOptions = 
        {
            from: '"TuneTalk" <skk8822@autuni.ac.nz>',
            to: userEmail.email,
            subject: "!TIME TO TUNE IN!",
            html: `<p>Hello ${userEmail.email}! Click the link below to post your song whether it's currently playing or recently played!</p>
                <a href='http://192.168.1.68:3000'>Post your song of the day</a>
            `,
        };

        const newEmail = await userEmail.create({ 
            email
        });

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log("Notification Email sent", info);
        res.status(200).json({ message: "Notification email sent successfully" });
    } 
    catch (error) 
    {
        console.log("Error sending notification email", error);
        res.status(500).json({ message: "Internal server error" });
    }

});

module.exports = router;