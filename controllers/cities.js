// import fetch from 'node-fetch';

const User = require('../models/user')
const City = require('../models/city')

module.exports = {
  delete: delCity,
  getAll,
  getZipcode,
  getWeather
}

async function delCity(req, res) {
  try {
    const city = await City.findByIdAndRemove(req.params.id)
    res.json(city)
    res.status(200)
  } catch (err) {
    res.status(400).json(err)
  }
}

async function getAll(req, res) {
  try {
    const cities = await City.find({'user': req.user._id}).sort('city');
    // const cities = await City.find({}).sort('city');
    res.json(cities)
    res.status(200)
  } catch (err) {
    res.status(400).json(err)
  }
}

async function getZipcode(req, res) {
  try {
    const zipCode = req.params.id
    const key = process.env.ZIPCODESTACK_KEY
    res1 = await fetch(`https://api.zipcodestack.com/v1/search?codes=${zipCode}&country=us&apikey=${key}`)
    res.body = await res1.json()
    const results1 = res.body.results
    // const results1 = {
    // "34609": [
    //   {
    //     "postal_code": "34609",
    //     "country_code": "US",
    //     "latitude": 28.4794,
    //     "longitude": -82.5083,
    //     "city": "Spring Hill",
    //     "state": "Florida",
    //     "city_en": "Spring Hill",
    //     "state_en": "Florida",
    //     "state_code": "FL"
    //   }
    //   ]}

    const results = results1[Object.keys(results1)[0]]
    // results[0] =
    //     "postal_code": "34609",
    //     "country_code": "US",
    //     "latitude": 28.4794,
    //     "longitude": -82.5083,
    //     "city": "Spring Hill",
    //     "state": "Florida",
    //     "city_en": "Spring Hill",
    //     "state_en": "Florida",
    //     "state_code": "FL"

    // we don't need city_en or state_en
    if (Array.isArray(results)) {
      delete results[0].city_en
      delete results[0].state_en
      // console.log(`req.params=${JSON.stringify(req.params)}`)
      results[0].user = req.user._id;
      try {
        // All body parameters are strings - no conversions needed
        const city = await City.create(results[0])
        res.json(city)
        res.status(200)
      } catch (err) {
        console.log(`getZipcode: err = ${err}`)
        res.status(400).json(err)
      }
    } else {
      // zip code is invalid
      res.json(undefined)
      res.status(404)
    }
  } catch (err) {
    res.status(400).json(err)
  }
  // console.log(res.body.results)
}

async function getWeather(req, res) {
  const city = await City.findById(req.params.id)
  const key = process.env.OPENWEATHERMAP_KEY
  const command = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.latitude}&lon=${city.longitude}&appid=${key}&units=imperial&exclude=current,minutely,hourly,alerts`
  const response = await fetch(command)
  const data = await response.json()
  data.location = `${city.city}, ${city.state_code}`
  res.send(data)
}