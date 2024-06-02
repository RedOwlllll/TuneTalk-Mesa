const express = require('express');
const router = express.Router();

// Generate a random time for today
const today = new Date();
const randomHour = Math.floor(Math.random() * 13) + 9;  // Generates a number from 9 to 21
const randomMinute = Math.floor(Math.random() * 60);

const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes());
const endTime = new Date(startTime.getTime() + 5 * 60000); // 5 minutes later

//const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), randomHour, randomMinute + 1);

router.get('/check-time', (req, res) => {
    const now = new Date();
    if (now >= startTime && now <= endTime) {
        res.json({ isEnabled: true });
        console.log("POST YOUR SHIT NOW ");
        console.log(Date(startTime.getTime))
        console.log(Date(endTime.getTime))

        
        //alert("TIME IS IN POST YOUR SHIT")
    } else {
        res.json({ isEnabled: false });
        console.log("not in time");
        console.log("TIME WINDOW:")
        console.log(Date(startTime.getTime))
        console.log(Date(endTime.getTime))
    }
});

module.exports = router;



