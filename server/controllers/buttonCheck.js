

// Import your notification module
const { sendNotificationEmail, pushNotification, randomDelayGenerator } = require('../utils/sendNotificationEmail');

let activeTime;  // This will store the time when the button should be active

// Function to set the random active time for the button each day
function setRandomActiveTime() {
    const now = new Date();
    const randomDelaySeconds = randomDelayGenerator(0, 86400); // Random time within the next 24 hours in seconds
    activeTime = new Date(now.getTime() + randomDelaySeconds * 1000);

    // Reset the timer for the next day
    setTimeout(() => {
        setRandomActiveTime();
    }, 86400000);  // Reset every 24 hours

    // For demonstration, we can use smaller delays like:
    // setTimeout(setRandomActiveTime, 10000); // every 10 seconds for testing
}

// Call this function when server starts
setRandomActiveTime();

// Middleware to check if the button should be active
function checkButtonAvailability(req, res, next) {
    const now = new Date();
    const isActive = now >= activeTime && now <= new Date(activeTime.getTime() + 5 * 60000); // 5 minutes duration
    if (isActive) {
        sendNotificationEmail('user@example.com', 'John Doe'); // Send an email notification
        pushNotification(); // Push a notification to device
    }
    req.isActive = isActive;
    next();
}


// API endpoint to check if the button is active
// app.get('/api/check-availability', checkButtonAvailability, (req, res) => {
//     res.json({ active: req.isActive });
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

function initButtonAvailability(app) {
    setRandomActiveTime();
    app.get('/api/check-availability', checkButtonAvailability, (req, res) => {
        res.json({ active: req.isActive });
    });
}

module.exports = { initButtonAvailability };
