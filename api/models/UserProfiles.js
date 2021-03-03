const mongoose = require('mongoose');

const UserProfileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: false
    },
    weight: {
        type: Number,
        required: false
    },
    owner: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);