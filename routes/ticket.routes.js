const {
    getAllTickets,
    getOneTicket,
    createTicket,
    updateTicket,

} = require('../controller/ticket.controller')

const {
    isAdmin,
    verifyToken
} = require('../middleware/authjwt')


module.exports = function(app){
    app.post('/crm/api/ticket/',[verifyToken],createTicket);
    app.put('/crm/api/ticket/:id',[verifyToken],updateTicket);
    app.get('/crm/api/ticket',[verifyToken],getAllTickets);
    app.get('/crm/api/ticket/:id',[verifyToken],getOneTicket);
}