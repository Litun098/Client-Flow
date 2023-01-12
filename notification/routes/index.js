const express = require('express');
const {
    acceptNotificationRequest,
    getNotification
} = require('../controllers/ticketNotification.controller');


module.exports = function(app){

    // API endpoint for create notification ticket
    app.post('/notifyServer/api/notifications/',acceptNotificationRequest);

    // API endpoint for get ticket with ticket Id
    app.get('/notifyServer/api/notifications/:id',getNotification);
}