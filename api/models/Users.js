const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
        // validate: {
        //     validator: function(v) {
        //       return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid email!`
        //   }
    },
    password: {
        type: String,
        required: true
        // validate: {
        //     validator: function(v) {
        //       return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
        //     },
        //     message: props => `Password must be at least 8 characters long and have at least one uppercase and lowercase letter, one number, and one special character.`
        //   }
    },
    logs: {
        type: String,
        required: true
    },
    templates: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    dateJoined: {
        type: Date,
        required: true
    }   
});

module.exports = mongoose.model('User', UserSchema);