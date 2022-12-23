import express, { json } from 'express';
import { mongoose } from 'mongoose';
import { DB_NAME,DB_URL } from './config/db.config.js';
import dotenv from 'dotenv'
dotenv.config();

const app = express()


mongoose.connect(DB_URL);
// console.log(DB_NAME);
app.use(json());

const db = mongoose.connection;
db.on('error',()=> console.log("Can't connect to DB"))
db.on('open',()=> console.log("Connected to DB"))


// let authRouter = require('./')
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("Server is running at port",port);
})