const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    requesterEmail: { type: String, ref: 'User', required: true },
    recipientEmail: { type: String, ref: 'User', required: true },
    status: {
        type: String,
        enums: ['pending', 'accepted', 'declined', 'blocked'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Friend', FriendSchema);