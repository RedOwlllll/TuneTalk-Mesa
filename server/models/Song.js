const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    body: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, default: Date.now }
});

const songSchema = new mongoose.Schema({
    spotifyUrl: { type: String, required: true, unique: true },
    comments: [commentSchema],
    addedAt: { type: Date, default: Date.now }
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;