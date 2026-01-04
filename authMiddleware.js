const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('./User');
const mongoose = require('mongoose');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

            if (mongoose.connection.readyState !== 1) {
                // Mock User for Middleware
                req.user = {
                    _id: decoded.id,
                    name: 'Mock User',
                    email: 'mock@example.com',
                    isAdmin: false,
                };
            } else {
                req.user = await User.findById(decoded.id).select('-password');
            }

            next();
        } catch (error) {
            console.error(error);
            // If token is valid but user not found (e.g. mock ID in real DB), still allow if in dev/mock mode
            if (mongoose.connection.readyState !== 1) {
                req.user = { _id: 'mock_id', name: 'Mock User', email: 'mock@example.com' };
                return next();
            }
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = { protect };
