const express = require('express');
const { chat } = require('./aiController');
const router = express.Router();

router.post('/chat', chat);

module.exports = router;
