// router to test API request
// https://www.geeksforgeeks.org/what-is-the-use-of-router-in-express-js/
const express = require("express");
const router = express.Router();

// import controllers
const {getTest} = require("../controllers/test");

// import middlewares

// api routes
router.get("/test", getTest);

module.exports = router;
