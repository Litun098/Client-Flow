const TicketNotification = require('../models/ticketNotification.model'); // Ticket Model

// This controller adds a new unsent notification to our db
exports.acceptNotificationRequest = async (req,res)=>{

    // Get subject, content, recipient email, requester, ticketId from user
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
exports.getNotification = async (req,res)=>{

    // Get ticket id from user
    const requestId = req.params.id;

    try{

        // Find the ticket with ticket id
        const notification = await TicketNotification.findOne({
            ticketId:requestId
        })

        // Send response to the user
        res.status(200).send({
            requestId:notification.ticketId,
            subject:notification.subject,
            content:notification.content,
            recipientEmail:notification.recipientEmail,
            sentStatus:notification.sentStatus
        })

    }catch(err){
        console.log(`Error while accepting notification request ${err.message}`);
        
        // If Any error occured Send error notification to user 
        res.status(500).send({
            message:"Internal server error!"
        })
    }
}