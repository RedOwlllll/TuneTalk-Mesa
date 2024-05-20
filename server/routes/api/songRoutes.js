// routes/songRoutes.js
const express = require('express');
const Song = require('../../models/Song'); 
const router = express.Router();

// Endpoint to add a new song
router.post('/songs', async (req, res) => {
    try {
        const { spotifyUrl } = req.body;
        let song = await Song.findOne({ spotifyUrl });
        if (song) {
            return res.status(409).json({ message: 'Song already exists' });
        }
        song = new Song({ spotifyUrl });
        await song.save();
        res.status(201).json(song);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding song');
    }
});

router.post('/songs/comment', async (req, res) => {
    const { spotifyUrl, username, comment, rating } = req.body;
    try {
        const song = await Song.findOneAndUpdate(
            { spotifyUrl },
            { $push: { comments: { username, body: comment, rating, date: new Date() } } },
            { new: true }
        );
        if (!song) {
            return res.status(404).send('Song not found');
        }
        res.json(song);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding comment and rating');
    }
});

module.exports = router;