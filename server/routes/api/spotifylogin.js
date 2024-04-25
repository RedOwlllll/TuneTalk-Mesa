const express = require("express");
const router = express.Router();
const axios = require('axios');
const SpotifyDetails = require('../../models/SpotifyDetails'); // Assuming this is where you define your Mongoose model

// Function to fetch user information from Spotify
router.post("/", async (req, res) => {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const userUrl = 'https://api.spotify.com/v1/me';
    const SPOTIFY_SECRET = '857d95768293440d9e1190b69916396a';
    



    /*
        Following Spotify authorization code 
    */
    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code: req.body.code,
        redirect_uri: req.body.redirectUri
    });
    
    const headers = {
        'Authorization': 'Basic ' + Buffer.from(req.body.clientId + ':' + SPOTIFY_SECRET).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    
    try {
        // Request access token from Spotify
        const tokenResponse = await axios.get(tokenUrl, {
            params: params.toString(),
            headers: headers
        });

        const { access_token } = tokenResponse.data;

        // If username exists, proceed to fetch user information from Spotify
        if (username) {
            // Request user information from Spotify
            const getProfile = await axios.get(userUrl, {
                headers: { 
                    Authorization: `Bearer ${access_token}` 
                }
            });
            const profile = getProfile.data;

            // Save user information to MongoDB
            const spotifyUser = await SpotifyDetails.add({
                spotifyUsername: profile.id,
                accessToken: access_token,
                displayName: profile.display_name || profile.id,
                profileImage: profile.images.length > 0 ? profile.images[0].url : ''
            });
            
            console.log("Spotify user registered successfully");
            return res.status(201).json({ status: "success", message: "Spotify user registered successfully", user: spotifyUser });
        } else {
            return res.status(400).json({ status: "error", message: "Username is required" });
        }
    } catch (error) {
        console.error("Error registering Spotify user!:", error.message);
        return res.status(500).json({ status: "error", message: error.message });
    }
});

module.exports = router;