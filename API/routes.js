let express = require('express')
let router = express.Router()
var UserController = require('./controllers/User')

router.get('/users',UserController.ShowUsers)
router.post('/users',UserController.AddUser)
router.post('/users/auth',UserController.Authenticate)
module.exports = router