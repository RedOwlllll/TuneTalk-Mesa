/* 
Schema/model for user login info that defines the structure 
and required properties of the data and their types.
*/

const mongoose = require("mongoose");

/* 
    Had to create a separate schema for the image schema as its an array object.
    which will be called in the User Details schema below. 
*/ 
const ImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        optional: true
    },
    width: {
        type: Number,
        optional: true
    }
});

const UserDetailsSchema = new mongoose.Schema({
    spotifyID: {
        type: String,
        required: [true, "Must have a Spotify ID"]
    },
    email: {
        type: String,
        required: [true, "Must have an email associated to Spotify account"]
    },
    displayName: {
        type: String
    },
    profileURL: {
        type: String
    },
    images: [ImageSchema] // Add this line to include an array of images
});

const UserDetails = mongoose.model("UserDetails", UserDetailsSchema);
module.exports = UserDetails;