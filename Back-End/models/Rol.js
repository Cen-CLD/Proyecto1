const mongoose = require('mongoose');

const RolSchema = new mongoose.Schema({
    type: { type: String, required: true }
});

module.exports = mongoose.model('roles', RolSchema);
