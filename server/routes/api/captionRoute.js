const express = require('express');
const router = express.Router();
const Caption = require('../../models/caption');
const User = require('../../models/userDetails1');

router.post('/:identifier/save-caption', async (req, res) => {
    const { identifier } = req.params;
    const { caption } = req.body;

    try{ 
    const userDetails = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }]
      });
  
      if (!userDetails) {
        return res.status(404).send('User not found');
      }

    const newCaption = new Caption({ caption });
    
    const savedCaption = await newCaption.save();

    userDetails.caption.push(newCaption);

    await userDetails.save();

    } catch (error){
        console.log("Error saving the caption: ", error);
        res.status(200).send(error.message);
    }
});

module.exports = router;