const express = require('express')

const controller = require('../controllers/api.controller')

const router = express.Router()

router.get('/', controller.index)

router.get('/users', controller.getUsers)

router.post('/authenticate', controller.authenticate)

module.exports = router