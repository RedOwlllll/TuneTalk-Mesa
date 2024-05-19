const mongoose = require('mongoose');

const UserCommunitySchema = new mongoose.Schema({
    username: {
        type: String,
        ref: 'User',
        required: true,
        unique: true
    },
    follows: {
        pop: { type: Boolean, default: false },
        classical: { type: Boolean, default: false },
        country: { type: Boolean, default: false },
        electronic: { type: Boolean, default: false },
        hiphop: { type: Boolean, default: false },
        indie: { type: Boolean, default: false },
        kpop: { type: Boolean, default: false },
        metal: { type: Boolean, default: false },
        rnb: { type: Boolean, default: false },
        rock: { type: Boolean, default: false },
    }
});

const UserCommunity = mongoose.model("User_Community", UserCommunitySchema);
module.exports = UserCommunity;