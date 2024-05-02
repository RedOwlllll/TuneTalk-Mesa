const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
// Routes
const loginRouter = require("./routes/api/tunetalklogin"); 
const registerRouter = require("./routes/api/tunetalkregister");
const spotifyRouter = require("./routes/api/spotifylogin");
const friendRouter = require('./routes/api/friendRoutes');
const addPost = require("./routes/routes")
const captionRoute = require("./routes/api/captionRoute");
//const commentRoutes = require('./routes/commentRoutes');

// routes / api
//const registerRouter = require("./routes/register");


// Connect to database
connectDB();

// Init middleware
app.use(express.json()); // allows the data from frontend to be transferred to backend/json file
app.use(cors({origin: true, credentials: true}));

// Init middleware
app.use(express.json({extended: false})); // Allows Express to read data sent using a POST or PUT request. It is used for recognizing incoming objects as JSON objects. 

app.use("/api/tunetalklogin", loginRouter);
app.use("/api/tunetalkregister", registerRouter);
app.use("/api/spotifylogin", spotifyRouter);
app.use("/api/friends", friendRouter);
app.use("/api", addPost);
app.use("/api", captionRoute); 


// print server is running when starting server - nodemon app
app.listen(8082, () => {
    console.log("Server is running!");
    
});