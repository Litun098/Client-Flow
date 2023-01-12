const cron = require('node-cron');
const EmailTransporter = require('../notifier/emailService')
const TicketNotification = require('../models/ticketNotification.model');
require('dotenv').config();


// Send notification in evenry 5 seconds
cron.schedule('*/5 * * * * *',async ()=>{

    // Find the ticket which are not sent 
    const notifications = await TicketNotification.find({
        sentStatus:"UN_SENT"
    })

    console.log(`Number of unsent notification ${notifications.length}`)

    //Send notificatio to each mail account which are not sent
    notifications.forEach(notification=>{
        const mailData = {
            from:process.env.EMAIL_USER, // Sender email 
            to:notification.recipientEmail,
            subject:notification.subject,
            text:notification.content
        }

        console.log(mailData)

        // Sending notification
        EmailTransporter.sendMail(mailData,async (err,info)=>{
            if(err){
                console.log(err);
            }else{
                console.log("Notification Sent.");

                // Find the ticket whose notificatio is sent
                const savedNotification = await TicketNotification.findOne({
                    _id:notification._id
                })
                // After sending notification update the send status ti sent
                savedNotification.sentStatus = "SENT"
                await savedNotification.save();
            }
        })
    })
})