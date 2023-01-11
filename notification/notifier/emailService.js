const nodemailer = require('nodemailer')
require('dotenv').config();


module.exports = nodemailer.createTransport({
    port:process.env.MAIL_PORT,
    host:"smtp.gmail.com",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    },
    secure:true
})