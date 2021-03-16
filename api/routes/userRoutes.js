const express = require('express');
const bcrypt = require('bcryptjs'); 
const Users = require('../models/Users');
const UserLogs = require('../models/UserLogs');
const UserProfiles = require('../models/UserProfiles');
const UserTemplates = require('../models/UserTemplates');
const { ensureAuthenticated } = require('../auth')

const router = express.Router();

router.delete('/:user', ensureAuthenticated, async (req, res) => { //Deletes specific template and log data
    if (req.query.resource === "logs") {
        UserLogs.updateOne( 
            { owner: req.params.user },
            { $pull: { logs:{ _id : req.body._id} } }
        )
        .then(result => res.json({message: result}))
        .catch(err => res.json({error: err.message}));
    } else if (req.query.resource === "templates") {
        UserTemplates.updateOne( 
            { owner: req.params.user },
            { $pull: { templates:{ _id : req.body._id} } }
        )
        .then(result => res.json({message: result}))
        .catch(err => res.json({error: err.message}));
    } else {
        res.status(400).json({message: '400: Bad request.'});
    }
});

router.put('/:user', ensureAuthenticated, async (req, res) => { //Updates specific template, log, and profile data
    if (req.query.resource === "logs") {
        UserLogs.updateOne(
            { owner: req.params.user },
            { $set: { "logs.$[outer]": req.body }}, 
            { "arrayFilters": [{"outer._id": req.body._id}]}
        )
        .then(result => res.json({message: result}))
        .catch(err => res.json({error: err.message}));
    } else if (req.query.resource === "templates") {
        UserTemplates.updateOne(
            { owner: req.params.user },
            { $set: { "templates.$[outer]": req.body }}, 
            { "arrayFilters": [{"outer._id": req.body._id}]}
        )
        .then(result => res.json({message: result}))
        .catch(err => res.json({error: err.message}));
    } else if (req.query.resource === "profile") {
        UserProfiles.updateOne(
            { owner: req.params.user },
            { 
                name: req.body.name,
                height: req.body.height,
                weight: req.body.weight,
            },
            { runValidators: true },
            (err, result) => {
                if (err) {
                    res.json({message: err.message});
                } else {
                    res.json(result);
                }
            }
        )
    } else {
        res.status(400).json({message: '400: Bad request.'});
    }
});

router.post('/:user', ensureAuthenticated, async (req, res) => { //Creates specific template and log data
    if (req.query.resource === "logs") {
        const logs = (await UserLogs.findOne({ owner: req.params.user })).logs;
        if (logs.length > 0) {
            req.body._id = logs[logs.length-1]._id + 1;
        } else {
            req.body._id = 1;
        }

        UserLogs.updateOne(
            { owner: req.params.user },
            { $push: { logs: [req.body] } },
            (err, result) => {
                if (err) {
                    res.json({message: err.message});
                } else {
                    res.json(result);
                }
            }
        )
    } else if (req.query.resource === "templates") {
        const templates = (await UserTemplates.findOne({ owner: req.params.user })).templates;
        
        if (templates.length > 0) {
            req.body._id = req.body._id = templates[templates.length-1]._id + 1;
        } else {
            req.body._id = 1;
        }
        
        UserTemplates.updateOne(
            { owner: req.params.user },
            { $push: { templates: [req.body] } },
            (err, result) => {
                if (err) {
                    res.json({message: err.message});
                } else {
                    res.json(result);
                }
            }
        )
    } else {
        res.status(400).json({message: '400: Bad request.'});
    }    
});

router.get('/:user', ensureAuthenticated, async (req, res) => { //Retrieves user info
    if (req.query.resource === "logs") {
        let logs = (await UserLogs.findOne({ owner: req.params.user }).exec()).logs;
        if (logs) {
            res.json(logs);
        } else {
            res.status(404).json({message: '404: not found.'});
        }
    } else if (req.query.resource === "templates") {
        let templates = (await UserTemplates.findOne({ owner: req.params.user }).exec()).templates;
        if (templates) {
            res.json(templates);
        } else {
            res.status(404).json({message: '404: not found.'});
        }
    } else if (req.query.resource === "profile") {
        let profile = (await UserProfiles.findOne({ owner: req.params.user }).exec());
        if (profile) {
            res.json(profile);
        } else {
            res.status(404).json({message: '404: not found.'});
        }
    } else {
        let userData = await Users.findOne({ username: req.params.user }).exec()
        if (userData) {
            res.json(userData);
        } else {
            res.status(404).json({message: '404: not found.'});
        }
    }
});

router.post('/', async (req, res) => { //Creates a new user
    try {
        //Using regular expressions to validate the username and password
        if (!(req.body.name) || !(req.body.username) || !(req.body.password) || !(req.body.passwordConf)) {
            throw 'You must include a name, username, password, and password confirmation to create a new user'
        } 
        
        if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.username))) {
            throw 'Provided email is not valid';
        }
        if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(req.body.password))) {
            throw 'Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character';
        }
        
        //Check to see if user already exists
        let userCheck = await Users.findOne({ username: req.body.username });

        if (userCheck) {
            throw 'A user with that email already exists'
        }

        //Compare two passwords
        let passCheck = (req.body.password === req.body.passwordConf);

        if (!passCheck) {
            throw 'The confirmed password does not match'
        }
        
        //Create logs reference
        const userLogs = new UserLogs({
            owner: req.body.username,
            logs: []
        });

        await userLogs.save()
        .then(() => console.log(`Created log for ${req.body.username}!`))
        .catch(err => {
            res.json({ message: err.message});
        });

        let logsId = (await UserLogs.findOne({ owner: req.body.username }, '_id').exec())._id;

        //Create profile reference
        const userProfiles = new UserProfiles({
            owner: req.body.username,
            name: req.body.name
        });

        await userProfiles.save()
        .then(() => console.log(`Created profile for ${req.body.username}!`))
        .catch(err => {
            res.json({ message: err.message});
        });

        let profileId = (await UserProfiles.findOne({ owner: req.body.username }, '_id').exec())._id;

        //Create templates reference
        const userTemplates = new UserTemplates({
            owner: req.body.username,
            logs: []
        });

        await userTemplates.save()
        .then(() => console.log(`Created templates for ${req.body.username}!`))
        .catch(err => {
            res.json({ message: err.message});
        });

        let templatesId = (await UserTemplates.findOne({ owner: req.body.username }, '_id').exec())._id;

        //Create master user identifier
        bcrypt.genSalt(15, (err, salt) => bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) throw err;
            let hashedPass = hash;
            
            const user = new Users({
                username: req.body.username,
                password: hashedPass,
                logs: logsId,
                templates: templatesId,
                profile: profileId,
                dateJoined: Date.now()
            });

            user.save()
            .then(data => res.json(data))
            .then(() => console.log("New User Created!"))
            .catch(err => {
                res.json({ message: err.message});
            });
        }));
    } catch(err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
});

module.exports = router;