
const express = require('express')
const UserController = require('./controllers/UsersController')
const LoginController = require('./controllers/LoginController')

const routes = express.Router()

routes.post('/login', LoginController.access)
routes.get('/logout', LoginController.logout)

routes.get('/', LoginController.verifyToken ,UserController.index)
routes.get('/:id', LoginController.verifyToken, UserController.indexById)
routes.post('/', LoginController.verifyToken, UserController.create)
routes.put('/:id', LoginController.verifyToken, UserController.edit)
routes.delete('/:id', LoginController.verifyToken, UserController.delete)

module.exports = routes