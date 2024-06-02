const express = require('express');
const router = express.Router();

// Generate a random time for today
const today = new Date();
const randomHour = Math.floor(Math.random() * 13) + 9;  // Generates a number from 9 to 13 
const randomMinute = Math.floor(Math.random() * 60);

//THIS CODE IS FOR TRUE RANDOM TIME
// const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), randomHour, randomMinute);
// const endTime = new Date(startTime.getTime() + 5 * 60000); // 5 minutes later


//THIS CODE IS FOR MANUAL TESTING, IT WILL CREATE A 5MIN WINDOW INSTANCE 1 MIN FROM THE MOMENT THE SERVER IS STARTED
const instanceTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes());
const startTime = new Date(instanceTime.getTime() + 1 * 60000); //1 Minute later
const endTime = new Date(startTime.getTime() + 5 * 60000); // 5 minutes later

//const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), randomHour, randomMinute + 1);

// router.get('/check-time', (req, res) => {
//     const now = new Date();
//     if (now >= startTime && now <= endTime) {
//         res.json({ isEnabled: true });
//         console.log('\x1b[31m%s\x1b[0m', 'TIME WITHIN WINDOW VALID');
//         console.log('\x1b[31m%s\x1b[0m', 'IT IS TIME TO TUNETALK');
//         console.log(`Time Start: ${startTime}`);
//         console.log(`Time End  : ${endTime}`);


   
//     } else {
//         res.json({ isEnabled: false });
//         console.log('\x1b[31m%s\x1b[0m', 'TIME WINDOW INVALID (Cannot post)');
//         console.log('\x1b[31m%s\x1b[0m', 'Chosen Time Window:');
//         console.log(`Time Start: ${startTime}`);
//         console.log(`Time End  : ${endTime}`);
//     }
// });


const TimeWindow = require('../../models/TimeWindow'); // adjust the path as necessary


// Route to check the time window
router.get('/check-time', async (req, res) => {
    const now = new Date();
    const timeWindow = await TimeWindow.findOne().sort({ _id: -1 }); // fetch the latest time window

    if (now >= timeWindow.startTime && now <= timeWindow.endTime) {
        res.json({ isEnabled: true });
        console.log('\x1b[31m%s\x1b[0m', 'TIME WITHIN WINDOW VALID');
        console.log('\x1b[31m%s\x1b[0m', 'IT IS TIME TO TUNETALK');
        console.log(`Time Start: ${timeWindow.startTime}`);
        console.log(`Time End  : ${timeWindow.endTime}`);
    
    } else {
        res.json({ isEnabled: false });
        console.log('\x1b[31m%s\x1b[0m', 'TIME WINDOW INVALID (Cannot post)');
        console.log('\x1b[31m%s\x1b[0m', 'Chosen Time Window:');
        console.log(`Time Start: ${timeWindow.startTime}`);
        console.log(`Time End  : ${timeWindow.endTime}`);
    }
});

// Route to set/update the time window
// router.post('/set-time-window', async (req, res) => {
//     const { startTime, endTime } = req.body; // Assume these are ISO string dates
//     const newTimeWindow = new TimeWindow({
//         startTime: new Date(startTime),
//         endTime: new Date(endTime)
//     });
//     await newTimeWindow.save();
//     res.send('Time window set successfully!');
// });



// Route to set/update the time window
router.post('/set-time-window', async (req, res) => {

    // Here you can also accept startTime and endTime from the request body if dynamic setting is needed
    const now = new Date();
    const startTime = new Date(now.getTime() + 20 * 60000); // 1 minutes from now
    const endTime = new Date(startTime.getTime() + 5 * 60000); // 6 minutes from startTime

    const newTimeWindow = new TimeWindow({
        startTime: startTime,
        endTime: endTime
    });

    try {
        await newTimeWindow.save();
        res.json({ message: 'Time window set successfully!', startTime, endTime });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports = router;



