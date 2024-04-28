const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
// Routes
const loginRouter = require("./routes/api/tunetalklogin"); 
const registerRouter = require("./routes/api/tunetalkregister");
const spotifyRouter = require("./routes/api/spotifylogin");
const friendRouter = require('./routes/api/friendRoutes');

// routes / api
const registerRouter = require("./routes/register");
const addPost = require("./routes/routes")
const commentRoutes = require('./routes/commentRoutes');

// Connect to database
connectDB();

// Init middleware
app.use(express.json()); // allows the data from frontend to be transferred to backend/json file
app.use(cors({origin: true, credentials: true}));

// Init middleware
app.use(express.json({extended: false})); // Allows Express to read data sent using a POST or PUT request. It is used for recognizing incoming objects as JSON objects. 


// print server is running when starting server - nodemon app
app.listen(8082, () => {
    console.log("Server is running!");
    
});



