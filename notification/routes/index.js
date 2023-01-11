const express = require('express');
const {
    acceptNotificationRequest,
    getNotification
} = require('../controllers/ticketNotification.controller');


module.exports = function(app){
    app.post('/notifyServer/api/notifications/',acceptNotificationRequest);
    app.get('/notifyServer/api/notifications/:id',getNotification);
}