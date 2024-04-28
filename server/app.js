const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");

// routes / api
const registerRouter = require("./routes/register");
const addPost = require("./routes/routes")
const commentRoutes = require('./routes/commentRoutes');

connectDB(); // Call connectDB import so mongodb is connected

app.use(express.json()); // allows the daat from frontend to be transferred to backend/json file
app.use(cors());
app.use(cors({origin: true, credentials: true}));

// Init middleware
app.use(express.json()); // Allows Express to read data sent using a POST or PUT request. It is used for recognizing incoming objects as JSON objects. 

// middleware/routes
//app.use('/api/songposts', routes);
app.use("/api", addPost);
app.use("/api", registerRouter);
app.use('/api', commentRoutes);

// print server is running when starting server - nodemon app
app.listen(8802, () => {
    console.log("Server is running on port 8802!");
});



