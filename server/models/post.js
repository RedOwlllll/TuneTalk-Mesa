const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    commentusername: {
        type: String,
    },

    commentbody: {
        type: String,
    },

    commentrating: {
        type:Number,
    },

    date: {type: Date, default: Date.now}
})

const postSchema = new Schema({ 
    postusername: {
        type: String, 
        
    },

    imageData: {
        type: String //store base64 image data
    },

    email: {
        type: String,
    },

    title: {
        type: String,
        
    },

    artist: {
        type: String,
        
    },

    rating: {
        type: Number,
        
    },

    caption: {
        type: String
        
    },

    comments: [commentSchema],


}, {timestamps:true})

module.exports = mongoose.model('Post', postSchema)
