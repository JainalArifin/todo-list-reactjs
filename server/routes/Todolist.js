const express = require('express')
const route = express.Router()
const todoController = require('../controller/todoController')
const auth = require('../helper/jwt')

route.get('/', auth.isLogin, todoController.findAll)
route.post('/', auth.isLogin, todoController.createTodo)
route.put('/:id', auth.isLogin, todoController.editTodo)
route.delete('/:id', auth.isLogin, todoController.delete)

module.exports = route