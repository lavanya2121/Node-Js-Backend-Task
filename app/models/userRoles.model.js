const mongoose = require('mongoose');

const UserRoleSchema = mongoose.Schema({
    role: { type: String, required: true },

}, {
    timestamps: true
});

module.exports = mongoose.model('UserRole', UserRoleSchema);