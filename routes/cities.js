const express = require('express')
const router = express.Router()
const citiesCtrl = require('../controllers/cities')

router.post('/', citiesCtrl.create)
router.delete('/:id', citiesCtrl.delete)
router.get('/', citiesCtrl.getAll)

module.exports = router