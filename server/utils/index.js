const randomTimeGenerator = require("./RandomTimeGenerator");
const sendNotifEmail = require("./sendNotifEmail");

// Generate random time
const { hour, min, sec } = randomTimeGenerator();
console.log(`Notification will be sent at ${hour}:${min}:${sec}`);

// Check if the generated time matches the current time
if (hour === new Date().getHours() && min === new Date().getMinutes() && sec === new Date().getSeconds()) {
    console.log("Loading the email...");
    sendNotifEmail();
}
