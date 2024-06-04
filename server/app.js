const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
// Routes
const loginRouter = require("./routes/api/tunetalklogin"); 
const registerRouter = require("./routes/api/tunetalkregister");
const spotifyRouter = require("./routes/api/spotifylogin");
const friendRouter = require('./routes/api/friendRoutes');
const followRouter = require('./routes/api/followRoutes');
const postRouter = require("./routes/api/posts");
const songRouter = require("./routes/api/songRoutes")
const profileRouter = require("./routes/api/userprofile");
const commentRouter = require('./routes/api/postComments'); // Adjust the path according to your setup

//const commentRoutes = require('./routes/commentRoutes');

// routes / api
//const registerRouter = require("./routes/register");
const server = http.createServer(app); // Create HTTP server
const io = socketIo(server); // Attach Socket.io to the server

connectDB(); // Call connectDB import so mongoDB is connected
console.log("DB connected")

//app.use(express.json()); // allows the data from frontend to be transferred to backend/json file
app.use(cors({origin: true, credentials: true}));

// Init middleware
app.use(express.json({extended: false, limit: '100mb' })); // Allows Express to read data sent using a POST or PUT request. It is used for recognizing incoming objects as JSON objects. 

app.use(express.json({extended: false})); // Allows Express to read data sent using a POST or PUT request. It is used for recognizing incoming objects as JSON objects. 
app.use(express.static('public'));
app.use(bodyParser.json({limit: '100mb'})); //100mb capacity for load
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));


app.use("/api/tunetalklogin", loginRouter);
app.use("/api/tunetalkregister", registerRouter);
app.use("/api/spotifylogin", spotifyRouter);
app.use("/api/friends", friendRouter);
app.use("/api/community", followRouter);
app.use("/api", followRouter);
app.use("/api/posts", postRouter);
app.use("/api", songRouter);
app.use("/api/userprofile", profileRouter); 
app.use("/api", commentRouter);


// Your existing middleware and routes setup

//To send real-time notification for rating and comments
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('comment', (data) => {
        console.log('Comment received:', data);
        // io.emit('notification', {
        //     message: `New comment from ${data.username}: ${data.comment}`,
        //     user: data.friendUsername
        // });
        socket.broadcast.emit('notification', data)
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


// print server is running when starting server - nodemon app
app.listen(8082, () => {
    console.log("Server is running!");
    
});