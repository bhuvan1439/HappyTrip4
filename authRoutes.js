const express = require('express');
const { registerUser, loginUser, googleLogin, facebookLogin } = require('./authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);
router.post('/facebook', facebookLogin);

module.exports = router;
