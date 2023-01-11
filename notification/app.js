const express = require('express');
const dbConfig = require('./configs/db.config');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect(dbConfig.DB_URL,
    () => { console.log("Connected to mongoDB") },
    err => { console.log('Error:', err.message) }
);
    
require('./routes/index')(app)
app.listen(3030,()=>{
    console.log("Application started at port",3030);
})

