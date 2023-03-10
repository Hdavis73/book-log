const express = require('express')
const router = express.Router()
const libraryControllers = require('../controllers/libraryController')

router.get('/', libraryControllers.showLibrary)

module.exports = router