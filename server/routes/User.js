const express = require('express')
const route = express.Router()
const UserController = require('../controller/UserController')
const auth = require('../helper/jwt')

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.get('/', auth.isLogin, UserController.all)
route.put('/:id', UserController.update)
route.delete('/:id', UserController.delete)


module.exports = route