/* 
    Schema/model for all data needed from user's spotify
*/

const mongoose = require("mongoose");

/* Model for Song */
const songSchema = new mongoose.Schema({
    songId: {
        type: String,
        required: true
    },
    addedAt: {
        type: Date,
        required: true
    }
});

/* Album */
const AlbumSchema = new mongoose.Schema({
    albumId: {
        type: String,
        required: true
    },
    addedAt: {
        type: Date,
        required: true
    }
});

/* Song in a playlist on spotify */
const PlaylistTrackSchema = new mongoose.Schema({
    playlistTrackId: {
        type: String,
        required: true
    },
    addedAt: {
        type: Date,
        required: true
    }
});

/* Spotify playlist */
const PlaylistSchema = new mongoose.Schema({
    playlistId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    tracks: [PlaylistTrackSchema] // Pass PlaylistTrackSchema
});

// Spotify Account
const SpotifyAccountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String
    },
    profileImage: {
        type: String
    },
    savedTracks: [songSchema],
    savedAlbums: [AlbumSchema],
    playlists: [PlaylistSchema]
});

const SpotifyDetails = mongoose.model("SpotifyDetails", SpotifyAccountSchema);
module.exports = SpotifyDetails;