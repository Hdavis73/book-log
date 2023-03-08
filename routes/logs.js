const express = require('express')
const router = express.Router()
const logsController = require('../controllers/logsController')

router.get('/', logsController.getChooseLog)
router.get('/bookLog', logsController.getBookLog)
router.get('/chapterLog', logsController.getChapterLog)
module.exports = router