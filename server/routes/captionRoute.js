const express = require('express');
const router = express.Router();
const Caption = require('../models/caption');

router.post('/api/save-caption', (req, res) => {
    const { caption } = req.body;

    const newCaption = new Caption({ caption });
    newCaption.save()
        .then(savedCaption => {
            res.status(200).json(savedCaption);
        })
        .catch(error => {
            res.status(500).json({ error: 'Error saving caption to database' });
        });
});

module.exports = router;