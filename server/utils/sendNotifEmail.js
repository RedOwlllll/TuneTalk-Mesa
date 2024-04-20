const { NotificationTransporter } = require("./NotificationTransporter");

const sendNotifEmail = (user) => {
    const transporter = NotificationTransporter(); //creating mail transporter object

    const mailOptions = {
        from: '"TuneTalk" <skk8822@autuni.ac.nz>',
        to: "tabithakay1004@gmail.com",
        subject: "!TIME TO TUNE IN!",
        html: `<p>Hello! Click the link below to post your song whether it's currently playing or recently played!</p>
            <a href = 'http://192.168.1.68:3000'>Post your song of the day</a>
        `,
    };

    transporter.sendMail(mailOptions, (Error, info) => {
        if(Error)
        {
            console.log(Error);
        }
        else
        {
            console.log("Notification Email sent");
        }
    });
};

module.exports = { sendNotifEmail };