const express = require('express')
const router = express.Router()
const logsController = require('../controllers/logs')

router.get('/chooseLog', logsController.getChooseLog)

module.exports = router