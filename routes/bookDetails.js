const express = require('express')
const router = express.Router()
const bookDetailsController = require('../controllers/bookDetailsController')

router.get('/loadBestSellerDetails/:body', bookDetailsController.loadBestSellerDetails)
router.get('/bestSellerDetails/:body', bookDetailsController.showBestSellerDetails)
router.get('/loadSelectedDetails/:body', bookDetailsController.loadSearchedBookDetails)
router.get('/selectedDetails/:body', bookDetailsController.showSearchedBookDetails)

module.exports = router