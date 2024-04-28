const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");

// routes / api
const registerRouter = require("./routes/register");
const addPost = require("./routes/routes")

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

// print server is running when starting server - nodemon app
app.listen(8802, () => {
    console.log("Server is running on port 8802!");
});


/**
 * const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");

// Call connectDB to connect to MongoDB
connectDB();

// Use CORS with the desired options
app.use(cors({ origin: true, credentials: true }));

// Parse incoming requests with JSON payloads
app.use(express.json());

// Middleware/routes
const registerRouter = require("./routes/register");
const addPost = require("./routes/routes");
app.use("/api", addPost);      // This might look like app.use("/api/posts", addPost); to be clearer
app.use("/api", registerRouter); // Same here, could be app.use("/api/register", registerRouter);

// Start the server
const port = process.env.PORT || 8802;
app.listen(port, () => console.log(`Server running on port ${port}!`));
 */





