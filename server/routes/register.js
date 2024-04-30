// const express = require('express');
// const router = require('express').Router();
// const user = require("../models/userDetails1");
// //const bcrypt = require('bcryptjs');
// //const express = require('express');
// //const router = express.Router();
// // const SongPost = require('../models/songPost');
// // const UserDetails = require('../models/userDetails');

// router.post("/", async(req,res) => {
//     const {email, username, password} = req.body;
    
//     try {

//         // Create a new user and store it in the MongoDB database
//         const newUser = await user.create({ 
//             email,
//             username,
//             password: password,
//         });
        
//         // Return the registered email and username along with the response
//         return res.status(201).json({
//             status: "ok",
//             message: "User successfully registered.",
//             user: {
//                 id: newUser._id,
//                 email: newUser.email,
//                 username: newUser.username
//             }
//         });
//     } catch (e) {
//         console.log("Error registering user to TuneTalk", e);
//         return res.status(500).json({status: "error", message: e.message});
//     }
// });

module.exports = router;