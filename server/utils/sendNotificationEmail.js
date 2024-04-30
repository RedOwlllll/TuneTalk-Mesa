const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

sgMail.setApiKey(process.env.API_KEY);

function sendNotificationEmail(userEmail, username) {
    const notification = {
        to: userEmail,
        from: {
            name:'Tune Talk',
            email: '2024tunetalk@gmail.com'
        },
        subject: '!TIME TO TUNE IN!',
        text: 'It is time to post your current/recently played song for your friends to see!',
        html: `<h2>Hello ${username}!</h2><p>It is time to post! <br><br>Click the link to post your current/recently played song for your friends to see!
        <br><br><a href="http://localhost:3000/account/home">Post here</a></p>`
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

function showNotification() {
    const notification = new Notification("!TIME TO TUNE IN!", {
        body: "It's time to post your current/recently played song "
    });

    notification.onclick = function(event) {
        event.preventDefault(); // Prevents the browser from focusing on the Notification's related tab
        navigate('/friends'); // Navigate to the desired page within the web application
        window.focus(); // Brings the focus to the newly opened tab
        if (notification) {
            notification.close(); // Closes the notification if it exists
        }
    }
}

function randomDelayGenerator(minSec, maxSec) {
    return Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec;
}

module.exports = { sendNotificationEmail, showNotification ,randomDelayGenerator};