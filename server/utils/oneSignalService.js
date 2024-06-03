const OneSignal = require('onesignal-node');

// Replace with your OneSignal App ID and API Key
const client = new OneSignal.Client('1c5f497a-4866-40a9-9db1-dead5b58e93c', OS_API_KEY);

async function sendRCNotif(postOwnerUsername, commenterUsername) {
    const notification = {
        contents: {
            'en': `${commenterUsername} commented and rated your post!`
        },
        headings: {
            'en': '!TIME TO TUNE IN!'
        },
        include_external_user_ids: [postOwnerUsername], // Assuming you have mapped OneSignal user IDs to your user names
        chrome_web_icon: 'http://localhost:3000/static/media/TuneTalkLogoBlack.16d0f5c9352a06b53052641b8fab2fac.svg'
    };

    try {
        const response = await client.createNotification(notification);
        console.log('Notification sent successfully:', response.body);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
}

module.exports = { sendRCNotif };
