const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    id_section: { type: mongoose.Schema.Types.ObjectId, refPath: 'sectionModel' },
    sectionModel: {
        type: String,
        required: true,
        enum: ['news', 'notices', 'complaints', 'initiatives']
    },
    id_autor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    comment: { type: String, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model('comments', CommentSchema);