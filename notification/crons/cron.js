const cron = require('node-cron');
const EmailTransporter = require('../notifier/emailService')

const TicketNotification = require('../models/ticketNotification.model');

cron.schedule('*/5 * * * * *',async ()=>{
    const notifications = await TicketNotification.find({
        sentStatus:"UN_SENT"
    })

    console.log(`Count of unsent notificatio ${notifications.length}`)

    notifications.forEach(notification=>{
        const mailData = {
            from:'crm.notificatio.service1999@gmail.com',
            to:notification.recipientEmail,
            subject:notification.subject,
            text:notification.content
        }

        console.log(mailData)

        EmailTransporter.sendMail(mailData,async (err,info)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log(info);
                const savedNotification = await TicketNotification.findOne({
                    id:notification._id
                })
                savedNotification.sentStatus = "SENT"
                await savedNotification.save();
            }
        })
    })
})