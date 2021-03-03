const mongoose = require('mongoose');

const UserLogSchema = mongoose.Schema({
    logs: {
        type: Array,
        required: true
    },
    owner: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('UserLog', UserLogSchema);