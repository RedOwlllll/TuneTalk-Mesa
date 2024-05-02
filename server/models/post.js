const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({ 
    postusername: {
        type: String, 
        
    },

    // image: {
    //     data: Buffer, // Store binary image data
    //     contentType: String // Store image MIME type (e.g., image/jpeg, image/png)
    // },

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
        
    }
    

}, {timestamps:true})

module.exports = mongoose.model('Post', postSchema)
