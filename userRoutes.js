const express = require('express');
const { getUserProfile } = require('./userController');
const { protect } = require('./authMiddleware');
const router = express.Router();

router.route('/profile').get(protect, getUserProfile);

module.exports = router;
