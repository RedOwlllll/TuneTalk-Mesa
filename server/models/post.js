const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    username: {
        type: String, 
        required: true
    },

    email: {
        type: String, 
        required: true

    },

    title: {
        type: String,
        required: true
    },

    artist: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    caption: {
        type: String,
        required: true
    }

}, {timestamps:true})

module.exports = mongoose.model('Post', postSchema)
