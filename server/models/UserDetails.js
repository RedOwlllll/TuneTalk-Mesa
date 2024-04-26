/* 
    Schema/model for user login info that defines the structure 
    and required properties of the data and their types.
*/

const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema({
    email: {
        // ensure that the email is unique so that an existing user does not signup w/ the same email
        type: String, unique: true, 
        required: [true, "Must provide an email."],
        unique: [true, "Must be a unique email."]
    },
    username: {
        // ensure that the username is unique so that an existing user does not signup w/ the same username
        type: String, unique: true, 
        required: [true, "Must provide a username."],
        unique: [true, "Must be a unique username."]
    },
    password: {
        type: String, 
        required: [true, "Must provide a password"]
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails', // This should match the model name
        default: []
    }]
});

const UserDetails = mongoose.model("UserDetails", UserDetailsSchema);
module.exports = UserDetails;