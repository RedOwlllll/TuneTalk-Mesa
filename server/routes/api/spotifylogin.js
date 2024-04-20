const express = require("express");
const router = express.Router();
const spotifyUser = require("../../models/UserDetails"); // import user details model

// Spotify api variables
const CLIENT_ID = "82051e28a62540019c2de5c903d8bca1";
const CLIENT_SECRET = "857d95768293440d9e1190b69916396a";
const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"; // Base url where we make the authorization request
const REDIRECT_URI = "http://localhost:3000/menu"; // uri after login successful



// Endpoint to save Spotify user data
router.post("/", async (req, res) => {

    try {
        // Check if user already exists
        let user = await spotifyUser.findOne({ spotifyId: req.body.spotifyId });

        if (user) {
            res.status(200).json(user);
        } else {
            // Create a new user on Spotify and save their data 
            user = new spotifyUser({
                spotifyId: req.body.spotifyId,
                email: req.body.email,
                displayName: req.body.displayName,
                profileUrl: req.body.profileUrl
            });

            await user.save();
            res.status(201).json(user);
        }
    } catch (error) {
        res.status(500).json({ message: "Error saving user", error });
    }
});

module.exports = router;