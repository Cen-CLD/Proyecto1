const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    photo: { type: String, required: true },
    status: { type: String, required: true },
    active: { type: String, required: true },
    created: { type: Date, required: true },
    id_author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
});

module.exports = mongoose.model('complaints', ComplaintSchema);