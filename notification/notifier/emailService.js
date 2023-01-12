const nodemailer = require('nodemailer')
require('dotenv').config();

module.exports = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
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
