const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: {type: String, required: true},
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetails'},
    postedAt: { type: Date, default: Date.now}
})

const captionSchema = new mongoose.Schema({
    caption: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const songPostschema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetails'},
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'SongPost' },
    title: { type: String, required: true},
    artist: { type: String, required: true},
    albumCover: { type: String, required: true},
    comments: [CommentSchema],
    rating: Number,
    caption: [captionSchema],
    postedAt: { type: Date, default: Date.now}
});

const SongPost = mongoose.model('SongPost', songPostschema);
const Comment = mongoose.model('Comment', CommentSchema)
const Caption = mongoose.model('Caption', captionSchema);
module.exports = { SongPost, Comment, Caption };