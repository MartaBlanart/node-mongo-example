const express = require("express")

const findTodoController = require("../controllers/todos/findTodo.controller")
const findOneTodoController = require("../controllers/todos/findOneTodo.controller")
const createTodoController = require("../controllers/todos/createTodo.controller")
const updateTodoController = require("../controllers/todos/updateTodo.controller")
const deleteTodoController = require("../controllers/todos/deleteTodo.controller")

const todoRouter = express.Router()

todoRouter.get('/', findTodoController)
todoRouter.get('/:id', findOneTodoController)
todoRouter.post('/', createTodoController)
todoRouter.patch('/:id', updateTodoController)
todoRouter.delete('/:id', deleteTodoController)

module.exports = todoRouter