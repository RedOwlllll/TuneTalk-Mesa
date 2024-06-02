const sgMail = require('@sendgrid/mail');
const notifier = require('node-notifier');
const path = require('path');
const dotenv = require('dotenv');
//const { sendNotificationEmail, pushNotification } = require('./sendNotificationEmail');
//const nodeCron = require('node-cron');

// Load environment variables from .env file
dotenv.config();

sgMail.setApiKey(process.env.API_KEY);

//To the send the email notification to the user
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

//To push a notification to the user's device 
function pushNotification() {
    notifier.notify({
        appName: 'Tune Talk',
        title: '!TIME TO TUNE IN!',
        message: "It's time to post your current/recently played song!",
        icon: path.join('http://localhost:3000/static/media/TuneTalkLogoBlack.16d0f5c9352a06b53052641b8fab2fac.svg')
    });
}

//For presentation purposes
function randomDelayGenerator(minSec, maxSec) {
    return Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec;
}

//For the real purpose of the app
//Generate a time 
function generateRandomTime(){
    const hour = Math.floor(Math.random() * 24);
    const min = Math.floor(Math.random() * 60);
    const sec = Math.floor(Math.random() * 60);

    return {hour, min, sec};
}

//Schedule in the generated time of daily song post
function scheduleTime(userEmail, username) {
    const { hour, min, sec } = generateRandomTime();
    const time = `${sec} ${min} ${hour} * * *`; // run at random time everyday

    nodeCron.schedule(time, () => {
        sendNotificationEmail(userEmail, username);
        pushNotification();
    })

    console.log(`Posting time is scheduled at ${hour}:${min}:${sec}`);
}

module.exports = { sendNotificationEmail, pushNotification,randomDelayGenerator, scheduleTime};