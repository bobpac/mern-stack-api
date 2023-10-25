const User = require('../models/user')
const City = require('../models/city')

module.exports = {
  create,
  delete: delCity,
  getAll
}

async function create(req, res) {
  try {
    // All body parameters are strings - no conversions needed
    const city = await City.create(req.body)
    res.json(city)
    res.status(200)
  } catch (err) {
    res.status(400).json(err)
  }
}

async function delCity(req, res) {
  try {
    console.log(req.body)
    const city = await City.findByIdAndRemove(req.body.id)
    res.json(city)
    res.status(200)
  } catch (err) {
    res.status(400).json(err)
  }
}

async function getAll(req, res) {
  try {
    const cities = await City.find({}).sort('city');
    res.json(cities)
    res.status(200)
  } catch (err) {
    res.status(400).json(err)
  }
}