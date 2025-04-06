const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id_card: { type: String, required: true },
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String, required: true },
    bibliography: { type: String, required: true },
    district: { type: String, required: true },
    email: { type: String, required: true },
    google_id: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    photo: { type: String, required: true },
    id_rol: [{ type: mongoose.Schema.Types.ObjectId, ref: 'roles' }]
});

module.exports = mongoose.model('users', UserSchema);
