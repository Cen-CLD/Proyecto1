const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    service: { type: String, required: true },
    content: { type: String, required: true }
});

module.exports = mongoose.model('services', ServiceSchema);