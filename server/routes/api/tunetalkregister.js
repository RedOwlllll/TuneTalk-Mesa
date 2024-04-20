// Signup API
const router = require('express').Router();
const bcrypt = require("bcryptjs");
const user = require("../../models/UserDetails");

router.post("/", async(req,res) => {
    const {email, username, password} = req.body;
    
    try {
        // First, check if user's email already exists in the database
        const existingEmail = await user.findOne({email});
        if (existingEmail) {
            return res.send({error: "Email is registered already. Please login instead"});
        }
        
        // Then check if username also exists in the database.
        const existingUsername = await user.findOne({username}); 
        if (existingUsername) {
            return res.send({error: "Username is registered already. Please choose a different username"});
        }

        // Encrypt the password user types so that in mogodb we dont see (for security reasons)
        const encryptedPassword = await bcrypt.hash(password, 10); 
        
        // Create a new user and store it in the MongoDB database
        const newUser = await user.create({ 
            email, 
            username,
            password: encryptedPassword
        });
        
        // Return the registered email along with the response
        return res.send({status: "ok", message: "User successfully registered.", email: newUser.email });
    } catch (e) {
        console.log(e);
        res.json({status: "error", message: e.message});
    }
});

module.exports = router;