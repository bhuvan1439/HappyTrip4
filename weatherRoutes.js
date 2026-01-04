const express = require('express');
const { getWeatherByCity } = require('./weatherController');
const router = express.Router();

router.get('/', getWeatherByCity);

module.exports = router;
