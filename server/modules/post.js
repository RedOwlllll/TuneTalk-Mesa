const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    username: {
        type: String, unique: true,
        required: [true, "Must provide a username."],
        unique: [true, "Must be a unique username."]
    },

    email: {
        type: String, unique: true, 
        required: [true, "Must provide an email."],
        unique: [true, "Must be a unique email."]

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
    }


}, {timestamps:true})

module.exports = mongoose.model('post', postSchema)
postSchema.find()