const authJwt = require('../middleware/authjwt');
const userController = require('../controller/user.controller');

module.exports = function(app) {
    app.get('/crm/api/users/',[authJwt.verifyToken,authJwt.isAdmin],(req,res)=>{
        userController.findAll()
    })
}