const express = require('express');
const router = express.Router();

// Generate a random time for today
const today = new Date();
const randomHour = Math.floor(Math.random() * 13) + 9;  // Generates a number from 9 to 21
const randomMinute = Math.floor(Math.random() * 60);
const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), randomHour, randomMinute);
const endTime = new Date(startTime.getTime() + 5 * 60000); // 5 minutes later


router.get('/check-time', (req, res) => {
    const now = new Date();
    if (now >= startTime && now <= endTime) {
        res.json({ isEnabled: true });
    } else {
        res.json({ isEnabled: false });
    }
});

module.exports = router;



