const express = require('express');
const { mongoose } =require('mongoose');
const {DB_URL} = require('./config/db.config')



const app = express()

console.log(DB_URL);
mongoose.connect(DB_URL);
app.use(express.json());

const db = mongoose.connection;
db.on('error',()=> console.log("Can't connect to DB"))
db.on('open',()=> console.log("Connected to DB"))


// let authRouter = require('./')
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("Server is running at port",port);
})