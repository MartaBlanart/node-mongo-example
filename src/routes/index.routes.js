const express = require('express')

const router = express.Router()

router.use('/todos', require('./todo.routes'))

module.exports = router
