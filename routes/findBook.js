const express = require('express')
// const { displaySearchedTitle } = require('../controllers/findBookController')
// const { loadFindBook } = require('../controllers/findBookController')
const router = express.Router()
const findBookController = require('../controllers/findBookController')

router.get('/', findBookController.loadFindBook)
router.get('/searchBook/:searchQuery', findBookController.searchTitle) 
router.get('/searchDisplay/:searchQuery', findBookController.displaySearchedTitle)

module.exports = router