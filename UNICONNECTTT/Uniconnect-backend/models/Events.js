const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    requirements: { type: [String], default : [] },
    participants: { type: [String], default : [] },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;