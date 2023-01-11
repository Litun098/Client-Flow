const express = require('express');
const {
    acceptNotificationRequest
} = require('../controllers/ticketNotification.controller');


module.exports = function(app){
    app.post('/notifyServer/api/notifications/',acceptNotificationRequest)
}