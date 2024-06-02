// routes/songRoutes.js
const express = require('express');
const Song = require('../../models/Song'); 
const router = express.Router();

// Endpoint to add a new song



router.post('/songs', async (req, res) => {
    try {
        const { spotifyUrl, previewURL } = req.body;
        // console.log(req.body); 
        let song = await Song.findOne({ spotifyUrl });
        if (song) {
            return res.status(409).json({ message: 'Song already exists' });
        }
        song = new Song({ spotifyUrl, previewURL }); // Pass the previewURL 
        await song.save();
        res.status(201).json(song);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding song');
    }
});





// Endpoint to comment and rate the song
router.post('/songs/comment', async (req, res) => {
    const { spotifyUrl, username, comment, rating } = req.body;
    try {
        let song = await Song.findOne({ spotifyUrl });
        if (!song) {
            return res.status(404).send('Song not found');
        }
        
        // Check if the user has already commented
        const existingCommentIndex = song.comments.findIndex(c => c.username === username);
        if (existingCommentIndex !== -1) {
            // User has commented before, update the existing comment
            song.comments[existingCommentIndex].body = comment;
            song.comments[existingCommentIndex].rating = rating;
            song.comments[existingCommentIndex].date = new Date(); // Update the date of the comment
        } else {
            // No existing comment from this user, add new
            song.comments.push({ username, body: comment, rating, date: new Date() });
        }

        await song.save(); // Save the updated song document
        res.json(song);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding comment and rating');
    }
});

// Endpoint to get comments for a song
router.get('/songs/comments/:spotifyUrl', async (req, res) => {
    try {
        const { spotifyUrl } = req.params;
        const song = await Song.findOne({ spotifyUrl });
        if (!song) {
            return res.status(404).send('Song not found');
        }
        res.json({ comments: song.comments });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching comments');
    }
});

module.exports = router;