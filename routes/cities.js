const express = require('express')
const router = express.Router()
const citiesCtrl = require('../controllers/cities')

router.delete('/:id', citiesCtrl.delete)
router.get('/', citiesCtrl.getAll)
router.get('/:id', citiesCtrl.getWeather)
router.get('/zipcode/:id', citiesCtrl.getZipcode)

module.exports = router