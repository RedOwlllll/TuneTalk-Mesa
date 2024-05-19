const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    requesterUsername: { type: String, ref: 'User', required: true },
    recipientUsername: { type: String, ref: 'User', required: true },
    status: {
        type: String,
        enums: ['pending', 'accepted', 'declined', 'blocked'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Friend', FriendSchema);