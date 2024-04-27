const express = require("express");
const router = express.Router();
const axios = require('axios');
const spotifyuser = require('../../models/SpotifyDetails'); // Assuming this is where you define your Mongoose model - NOTE: still unsure on whether to use UserDetails or SpotifyDetails. 

// Function to fetch user information from Spotify
router.post("/", async (req, res) => {
    
    const { spotifyID, spotifyURL, displayName, spotifyEmail } = req.body;

    try {
        const spotifyUser = await spotifyuser.create({
            spotifyID,
            spotifyURL,
            displayName, 
            spotifyEmail
        });

        // Return the spotify account's details 
        return res.send({status: "ok", message: "Spotify account connected (to mongo).", 
        spotifyID: spotifyUser.spotifyID, spotifyURL: spotifyUser.spotifyURL, displayName: spotifyUser.displayName, spotifyEmail: spotifyUser.spotifyEmail });
    }
    catch (e) {
        console.log("Error registering spotify account to TuneTalk", e);
        return res.status(500).json({status: "error", message: "Error registering spotify account to TuneTalk", errors: e.errors || e.message });
    }
});

module.exports = router;