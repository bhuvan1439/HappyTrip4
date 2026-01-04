const express = require('express');
const router = express.Router();
const { getPlaces } = require('./placeController');

router.get('/search', getPlaces);

module.exports = router;
