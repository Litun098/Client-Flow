const nodemailer = require('nodemailer')
require('dotenv').config();

module.exports = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Add your gmail 
        pass: process.env.EMAIL_PASS, // Gmail password
    },
})

// service:"gmail",
// debug:true,
// port:process.env.MAIL_PORT,
// host:'smtp.gmail.com',
// auth:{
//     user:process.env.EMAIL_USER,
//     password:process.env.EMAIL_PASS
// }
