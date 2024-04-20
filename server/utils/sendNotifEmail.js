const UserDetails = require("../models/UserDetails");
const { NotificationTransporter } = require("./NotificationTransporter");

const sendNotifEmail = async () => {
    const transporter = NotificationTransporter(); //creating mail transporter object

    const user = await UserDetails.findOne({email}); //fetch the user's email address to send the email to

    if (!user)
    {
        console.log('The user does not exist');
    }

    const mailOptions = {
        from: '"TuneTalk" <skk8822@autuni.ac.nz>',
        to: user.email,
        subject: "!TIME TO TUNE IN!",
        html: `<p>Hello! Click the link below to post your song whether it's currently playing or recently played!</p>
            <a href = 'http://192.168.1.68:3000'>Post your song of the day</a>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error)
        {
            console.log("Error sending notification email", error);
        }
        else
        {
            console.log("Notification Email sent");
        }
    });
};

module.exports = { sendNotifEmail };