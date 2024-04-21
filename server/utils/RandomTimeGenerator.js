const UserDetails = require("../models/UserDetails");
const { sendNotifEmail } = require("./sendNotifEmail");

function randomTimeGenerator()
{
    const startHour = 0; //12:00 AM
    const endHour = 23; //11:00 

    const hour = Math.floor(Math.random() * (endHour - startHour +1)) + startHour;
    const min = Math.floor(Math.random() * 60);
    const sec = Math.floor(Math.random() * 60);

    return { hour, min, sec };
}

const randomTime = randomTimeGenerator();
const milliSec = (randomTime.hour * 60 * 60 + randomTime.min * 60 + randomTime.sec) * 1000;

//schedule email sending
setTimeout(() =>{
    console.log("Sending notification email now...");
    sendNotifEmail(UserDetails);
}, milliSec);