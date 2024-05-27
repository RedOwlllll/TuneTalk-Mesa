const sgMail = require('@sendgrid/mail');
const notifier = require('node-notifier');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

sgMail.setApiKey(process.env.API_KEY);

//To the send the email notification to the user
function rateComNotifEmail(userEmail, username, friend, comment, rating) {
    const notification = {
        to: userEmail,
        from: {
            name:'Tune Talk',
            email: '2024tunetalk@gmail.com'
        },
        subject: '!TIME TO TUNE IN!',
        text: 'It is time to post your current/recently played song for your friends to see!',
        html: `<h2>Hello ${username}!</h2><p>${friend} commented: ${comment} <br> rating: ${rating}
        <br><br><a href="http://localhost:3000/feed">See the comment here!</a></p>`
    };

    sgMail
        .send(notification)
        .then(() => {
            console.log('Notification Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
}

//To push a notification to the user's device 
function pushRateCommentNotif() {
    notifier.notify({
        appName: 'Tune Talk',
        title: '!TIME TO TUNE IN!',
        message: "Your friends have commented and rated your post!",
        icon: path.join('http://localhost:3000/static/media/TuneTalkLogoBlack.16d0f5c9352a06b53052641b8fab2fac.svg')
    });
}

module.exports = { rateComNotifEmail, pushRateCommentNotif };