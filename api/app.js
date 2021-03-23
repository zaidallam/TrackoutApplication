const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
require('dotenv/config');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: "https://trackoutapp.netlify.app/",
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session())
require('./passportConfig')(passport);

app.use(cookieParser(process.env.SESSION_SECRET));

//Import routers
const userRoutes = require('./routes/userRoutes');

//Routes
app.use('/users', userRoutes);
app.post('/login', async (req, res, next) =>{
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) {
            res.status(404).json({message: "Incorrect Credentials"})
        } 
        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.json({message: "Successful Authentication"});
            })
        }
    })(req, res, next);
});

app.delete('/logout', (req, res) =>{
    req.logOut();
    res.json({message: "Successful Logout"});
});

app.get('/checkauth', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ authenticated: true, user: req.user.username })
    } else {
        res.json({ authenticated: false })
    }
});

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log("Connected to DB")
);

//Listener
app.listen(5000, () => console.log("Server Started"));