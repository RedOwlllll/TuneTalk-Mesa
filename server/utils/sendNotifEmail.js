const UserDetails = require("../models/UserDetails");
const { NotificationTransporter } = require("./NotificationTransporter");

const sendNotifEmail = async () => {
    const transporter = NotificationTransporter(); //creating mail transporter object

    try {
        const user = await UserDetails.findOne(); // fetch the user's details

        if (!user || !user.email) 
        {
            console.log('The user does not exist');
            return; // Exit early if user or user email does not exist
        }

        const mailOptions = 
        {
            from: '"TuneTalk" <skk8822@autuni.ac.nz>',
            to: user.email,
            subject: "!TIME TO TUNE IN!",
            html: `<p>Hello ${user.email}! Click the link below to post your song whether it's currently playing or recently played!</p>
                <a href='http://192.168.1.68:3000'>Post your song of the day</a>
            `,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log("Notification Email sent", info);
    } 
    catch (error) 
    {
        console.log("Error sending notification email", error);
    }

};

module.exports = { sendNotifEmail };