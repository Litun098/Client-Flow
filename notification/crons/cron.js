const cron = require('node-cron');
const EmailTransporter = require('../notifier/emailService')
const TicketNotification = require('../models/ticketNotification.model');
require('dotenv').config();


cron.schedule('*/5 * * * * *',async ()=>{
    const notifications = await TicketNotification.find({
        sentStatus:"UN_SENT"
    })

    console.log(`Count of unsent notification ${notifications.length}`)

    notifications.forEach(notification=>{
        const mailData = {
            from:process.env.EMAIL_USER,
            to:notification.recipientEmail,
            subject:notification.subject,
            text:notification.content
        }

        console.log(mailData)

        EmailTransporter.sendMail(mailData,async (err,info)=>{
            if(err){
                console.log(err);
            }else{
                console.log("Information",info);
                const savedNotification = await TicketNotification.findOne({
                    _id:notification._id
                })
                savedNotification.sentStatus = "SENT"
                await savedNotification.save();
            }
        })
    })
})