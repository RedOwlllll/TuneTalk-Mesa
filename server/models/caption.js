const mongoose = require('mongoose')

const captionSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'SongPost' }, // Reference to the Post collection
    caption: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Caption = new mongoose.model('Caption', captionSchema);
module.exports = Caption;