// models/TimeWindow.js
const mongoose = require('mongoose');

const timeWindowSchema = new mongoose.Schema({
    startTime: Date,
    endTime: Date
});

const TimeWindow = mongoose.model('TimeWindow', timeWindowSchema);

module.exports = TimeWindow;
