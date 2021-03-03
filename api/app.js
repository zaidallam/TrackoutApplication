const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();

//Middleware
app.use(bodyParser.json());

//Import routers
const userRoutes = require('./routes/userRoutes');

//Routes
app.use('/users', userRoutes);

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log("Connected to DB")
);

//Listener
app.listen(5000, () => console.log("Server Started"));