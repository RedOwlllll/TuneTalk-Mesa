const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
// Routes
const loginRouter = require("./routes/api/tunetalklogin"); 
const registerRouter = require("./routes/api/tunetalkregister");

// Connect to database
connectDB();

// Middleware
app.use(cors({origin: true, credentials: true}));
app.use(express.json()); // Use this only once

// Use Routes
app.use("/api/tunetalklogin", loginRouter);
app.use("/api/tunetalksignup", registerRouter);

// Start the server
app.listen(8082, () => {
    console.log("Server is running!");
});