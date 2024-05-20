const express = require('express');
const router = express.Router();
const user = require("../../models/UserDetails");
const multer = require("multer");
const path = require('path');

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads'); // Will save profile images uploaded in these folders.
    },
    filename: function(req, file, cb) {
        const imageName = file.originalname;
        cb(null, imageName);
    }
});

// Specify image types
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (allowedFileTypes.includes(file.mimetype))
    {
        cb (null, true);
    }
    else
    {
        cb(null, false);
    }
}
const upload = multer({ storage, fileFilter });


// Update Profile
router.put('/', upload.single('profileImage'), async (req, res) => {
    const { username, email, bio } = req.body;

    try {
        // Find the user by their email
        const userprofile = await user.findOne({ email: email });
        if (!userprofile) {
            return res.json({ status: "error", message: 'User not found' });
        }

        // Update user details; only update if provided
        userprofile.username = username || userprofile.username;
        userprofile.email = email ||  userprofile.email;
        userprofile.bio = bio !== "" ? bio : userprofile.bio;

        // Update the profile image if a new one was uploaded
        if (req.file) {
            userprofile.profileImage = `http://localhost:8082/uploads/${req.file.filename}`;
        }

        await userprofile.save();

        // Return updated user details
        return res.json({
            status: "ok",
            user: {
                username: userprofile.username,
                email: userprofile.email,
                bio: userprofile.bio,
                profileImage: userprofile.profileImage
            }
        });

    } catch (error) {
        console.error("Error updating profile:", error);
        return res.json({ status: "error", message: "Server error" });
    }
});

module.exports = router;