const express = require('express');
const router = express.Router();
const user = require("../../models/UserDetails");
const multer = require("multer");

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
router.put('/edit-profile', upload.single('profileImage'), async (req, res) => {
    const { username, email, bio } = req.body;

    try {
        const userprofile = await user.findOne({ email: email }); // Use the current email to find the user
        if (!userprofile) {
            return res.status(404).json({ status: "error", message: 'User not found' });
        }

        // Update user details; only update if provided
        userprofile.username = username || userprofile.username;
        userprofile.email = email || userprofile.email;
        userprofile.bio = bio !== "" ? bio : userprofile.bio;

        // Update the profile image if a new one was uploaded
        if (req.file) {
            userprofile.profileImage = `http://localhost:8082/uploads/${req.file.filename}`;
        }

        await userprofile.save();

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
        return res.status(500).json({ status: "error", message: "Server error" });
    }
});

// Checks email availability and prevents user from changing their email to one that is already in use.
router.get("/email-availability/:email", async (req, res) => {
    const { email } = req.query;

    try {
        const existingUser = await user.findOne({ email: email });
        if (existingUser) {
            return res.json({
                status: "error",
                message: "Email already in use",
                isAvailable: false
            });
           
        }
        return res.json({
            status: "ok",
            message: "Email updated!",
            isAvailable: true
        });
    } catch (error) {
        console.error("Error checking availability:", error);
        return res.status(500).json({ status: "error", message: "Server error" });
    }
});


// Checks username availability and prevents user from changing their username to one that is already in use.
router.get("/username-availability/:username", async (req, res) => {
    const { username } = req.query;

    try {
        const existingUser = await user.findOne({ username: username });
        if (existingUser) {
            return res.json({
                status: "error",
                message: "Username is already in use",
                isAvailable: false
            });
           
        }
        return res.json({
            status: "ok",
            message: "Username updated!",
            isAvailable: true
        });
    } catch (error) {
        console.error("Error checking availability:", error);
        return res.status(500).json({ status: "error", message: "Server error" });
    }
});



// Follow Community
router.post('/community/follow/:username', async (req, res) => {
    const { username } = req.params;
    const { community, featuredTrack } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.communities.includes(community)) {
            user.communities.push(community);

            const recommendation = {
                track: featuredTrack,
                addedBy: user._id
            };
            user.recommendations.push(recommendations);
            const savedUser = await user.save();

            res.status(201).json(savedUser.recommendations);
        } else {
            res.status(200).json({ message: 'Already following this community' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;