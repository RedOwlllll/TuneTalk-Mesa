/* 
    Schema/model for all data needed from user's spotify
*/

const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    songId: {
        type: String
    },
    addedAt: { 
        type: Date, 
        default: Date.now 
    }
});

const AlbumSchema = new mongoose.Schema({
    albumId: {
        type: String
    },
    addedAt: { 
        type: Date, 
        default: Date.now 
    }
});

const PlaylistTrackSchema = new mongoose.Schema({
    playlistTrackId: {
        type: String
    },
    addedAt: { 
        type: Date, 
        default: Date.now 
    }
});

const PlaylistSchema = new mongoose.Schema({
    playlistId: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    tracks: [PlaylistTrackSchema]
});

const SpotifyAccountSchema = new mongoose.Schema({
    spotifyID: { 
        type: String, 
    },
    spotifyURL: {
        type: String,
    },
    displayName: {
        type: String,
    },
    spotifyEmail: {
        type: String, 
    },
    accessToken: { 
        type: String, 
    },
    refreshToken: { 
        type: String, 
    },
    tokenExpiresIn: { 
        type: Date 
    },
    addedAt: { 
        type: Date, 
        default: Date.now 
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