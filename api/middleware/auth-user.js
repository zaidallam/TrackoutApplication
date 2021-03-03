const auth = require('basic-auth');
const User = require('../models/Users');
const bcrypt = require('bcryptjs');

//This is checks to see if the user is authorized

async function authUser (req, res, next) {
    let message;
    
    const credentials = auth(req);

    if (credentials.name) {
        const user = await User.findOne({ email: credentials.name});
        if (user) {
            const authenticated = bcrypt
                .compareSync(credentials.pass, user.password);
            if (authenticated) {
                console.log(`Auth successful for user ${user.email}`);
                req.currentUser = user;
            } else {
                message = `Auth failed for username: ${user.email}`;
            }
        } else {
            message = `User not found for ${user.email}`;
        }
    } else {
        message = 'Auth header not found';
    }

    if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
    } else {
        next();
    }
    
}

module.exports = authUser;