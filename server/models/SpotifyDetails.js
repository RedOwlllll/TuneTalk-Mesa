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
    spotifyUsername: { 
        type: String, 
        required: [true, "Must have a username for the Spotify Account."]
    },
    spotifyEmail: {
        type: String, 
        required: [true, "Must have a email for the Spotify Account."]
    },
    accessToken: { 
        type: String, 
        required: [true, "Must have an access token for the Spotify Account."]
    },
    refreshToken: { 
        type: String, 
        required: [true, "Must have a refresh token for the Spotify Account."]
    },
    tokenExpiresIn: { 
        type: Date 
    },
    addedAt: { 
        type: Date, 
        default: Date.now 
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