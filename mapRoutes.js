const express = require('express');
const { getRoutes } = require('./mapController');
const router = express.Router();

router.get('/routes', getRoutes);

module.exports = router;
