const User = require('./User');
const generateToken = require('./generateToken');
const mongoose = require('mongoose');

// Mock User Store for when DB is down
const mockUsers = [];

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!isDbConnected()) {
        console.log('DB not connected. Using Mock Registration.');
        const userExists = mockUsers.find(u => u.email === email);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists (Mock)' });
        }
        const newUser = { _id: Date.now().toString(), name, email, password };
        mockUsers.push(newUser);
        return res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id),
        });
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!isDbConnected()) {
        console.log('DB not connected. Using Mock Login.');
        const user = mockUsers.find(u => u.email === email);

        // For demo purposes, if user not found in mock list, allow login anyway
        // This is useful if they just want to see the UI state change
        if (user && user.password === password) {
            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            return res.json({
                _id: 'mock_id_123',
                name: 'Mock User',
                email: email,
                token: generateToken('mock_id_123'),
            });
        }
    }

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Google Login (Mock/Simulated)
// @route   POST /api/auth/google
// @access  Public
const googleLogin = async (req, res) => {
    const { email, name, googleId } = req.body;

    if (!isDbConnected()) {
        console.log('DB not connected. Using Mock Google Login.');
        return res.json({
            _id: 'mock_google_id',
            name: name || 'Google User',
            email: email,
            token: generateToken('mock_google_id'),
        });
    }

    try {
        // Check if user exists
        let user = await User.findOne({ email });

        if (user) {
            // User exists, return token
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            // Create new user (Simulated password)
            user = await User.create({
                name: name || 'Google User',
                email,
                password: googleId + 'secret', // Mock password
            });

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Facebook Login (Mock/Simulated)
// @route   POST /api/auth/facebook
// @access  Public
const facebookLogin = async (req, res) => {
    const { email, name, facebookId } = req.body;

    if (!isDbConnected()) {
        console.log('DB not connected. Using Mock Facebook Login.');
        return res.json({
            _id: 'mock_facebook_id',
            name: name || 'Facebook User',
            email: email,
            token: generateToken('mock_facebook_id'),
        });
    }

    try {
        // Check if user exists
        let user = await User.findOne({ email });

        if (user) {
            // User exists, return token
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            // Create new user (Simulated password)
            user = await User.create({
                name: name || 'Facebook User',
                email,
                password: facebookId + 'secret', // Mock password
            });

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, googleLogin, facebookLogin };
