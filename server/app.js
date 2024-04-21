const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
// routes / api
const loginRouter = require("./routes/api/tunetalklogin"); 
const registerRouter = require("./routes/api/tunetalkregister");
const spotifyRouter = require("./routes/api/spotifylogin");

connectDB(); // Call connectDB import so mongodb is connected

app.use(express.json()); // allows the daat from frontend to be transferred to backend/json file
app.use(cors());
app.use(cors({origin: true, credentials: true}));

// Init middleware
app.use(express.json({extended: false})); // Allows Express to read data sent using a POST or PUT request. It is used for recognizing incoming objects as JSON objects. 

// middleware/routes
app.use("/api/tunetalklogin", loginRouter);
app.use("/api/tunetalksignup", registerRouter);
app.use("/api/spotifylogin", spotifyRouter);


// print server is running when starting server - nodemon app
app.listen(8082, () => {
    console.log("Server is running!");
    
});