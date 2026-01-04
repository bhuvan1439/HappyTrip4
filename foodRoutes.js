const express = require('express');
const router = express.Router();
const { getFoodSuggestions } = require('./foodController');

router.get('/suggestions', getFoodSuggestions);

module.exports = router;
