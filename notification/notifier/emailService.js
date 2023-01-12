const nodemailer = require('nodemailer')
require('dotenv').config();

module.exports = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Add your gmail 
        pass: process.env.EMAIL_PASS, // Gmail password
    },
})
