require('./crons/cron') //using cron notification
const express = require('express');
const dbConfig = require('./configs/db.config');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// express.json() for getting request and getting response
app.use(express.json());

// Connect to the mongo db
mongoose.connect(dbConfig.DB_URL,
    () => { console.log("Connected to mongoDB") }, //If connected
    err => { console.log('Error:', err.message) }  // If not connected
);

// Using routes
require('./routes/index')(app)

// Getting port numebr of from dotenv file or set 3030
port = process.env.PORT || 3030
app.listen(port, () => {
    console.log("Application started at port", port);
})

