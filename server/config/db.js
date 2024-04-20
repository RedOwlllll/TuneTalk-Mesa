const config = require("config");
const mongoose = require("mongoose");
const MONGODB_URI = "mongodb+srv://maxinnesjs:0tZKooVor7na94si@cluster0.w9uv8re.mongodb.net/";

const connectDB = async () => {
    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect( MONGODB_URI, {
        useNewUrlParser: true,
      });

      console.log('MongoDB is connected!');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };

module.exports = connectDB;