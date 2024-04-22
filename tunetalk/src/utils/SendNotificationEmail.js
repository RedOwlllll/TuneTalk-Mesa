const { NotificationTransporter } = require("./NotificationTransporter");

const SendNotificationEmail = (user) => {
    const transporter = NotificationTransporter();

    const mailOptions = {
        from: '"TuneTalk" <skk8822@autuni.ac.nz>',
        to: user.email,
        subject: "!TIME TO TUNE IN!",
        html: `<p>Hello, It's time to post your song, whether it's currently playing or recently played!</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) 
        {
            console.log(error);
        }
        else
        {
            console.log("Notification email sent");
        }
    });
};

module.exports = { SendNotificationEmail };