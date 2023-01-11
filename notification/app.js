const express = require('express');
require('./crons/cron')
const dbConfig = require('./configs/db.config');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(dbConfig.DB_URL,
    () => { console.log("Connected to mongoDB") },
    err => { console.log('Error:', err.message) }
);
    
require('./routes/index')(app)

console.log(process.env.PORT);

port = process.env.PORT || 3030
app.listen(port,()=>{
    console.log("Application started at port",3030);
})

