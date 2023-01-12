const Client = require("node-rest-client").Client

const client = new Client();

module.exports = (ticketId, subject, content, emailId, requester) => {
    var reqBody = {
        "subject": subject,
        "ticketId": ticketId,
        "content": content,
        "recipientEmail": emailId,
        "requester": requester
    }

    const args = {
        data: reqBody,
        headers: { "Content-Type": "application/json" }
    }

    client.post('http:localhost:3000/notifyServer/api/notifications/', (data, response) => {
        console.log('Request sent');
        console.log(data)
    })
}