const express = require('express');
const router = require('express').Router();
const user = require("../models/userDetails");

//const express = require('express');
//const router = express.Router();
// const SongPost = require('../models/songPost');
// const UserDetails = require('../models/userDetails');

router.post("/", async(req,res) => {
    //const {email, username, password} = req.body;
    
    try {

        // Create a new user and store it in the MongoDB database
        const newUser = await user.create({ 
            email: 'testuser@example.com', 
            username: 'testuser123',
            password: 'A12345678bb'
        });
        
        // Return the registered email and username along with the response
        return res.send({status: "ok", message: "User successfully registered.", email: 'testuser@example.com', username: 'testuser123' });
    } catch (e) {
        console.log("Error registering user to TuneTalk", e);
        return res.status(500).json({status: "error", message: e.message});
    }
});

module.exports = router;