const mongoose = require('mongoose');

const UserTemplateSchema = mongoose.Schema({
    templates: {
        type: Array,
        required: true
    },
    owner: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('UserTemplates', UserTemplateSchema);