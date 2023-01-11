const TicketNotification = require('../models/ticketNotification.model');

// This controller adds a new unsent notification to our db
exports.acceptNotificationRequest = async (req,res)=>{
    // const notificationObject = {
    // }
    const subject = req.body.subject
    const content = req.body.content
    const recipientEmail = req.body.recipientEmail
    const requester = req.body.requester
    const ticketId = req.body.ticketId

    try{
        const notification = await TicketNotification.create({
            subject,
            ticketId,
            content,
            recipientEmail,
            requester
        })

        res.status(200).send({
            requestId:notification._id,
            status:"Accepted Request"
        })
    }catch(err){
        console.log('Error while accepting a notification requrst',err.message);
        res.status(500).send({
            message:"Internal server error"
        })
    }
}



// tells client the current status of a notification.
// exports.getNotification = function