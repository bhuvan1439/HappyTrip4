const User = require('./User');
const mongoose = require('mongoose');

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    if (!isDbConnected()) {
        // Mock User Profile
        return res.json({
            _id: req.user._id,
            name: req.user.name || 'Mock User',
            email: req.user.email || 'mock@example.com',
            preferences: {
                budget: 'Medium',
                interests: ['History', 'Culture', 'Food']
            },
            savedTrips: [] // Mock trips will be fetched separately
        });
    }

    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            preferences: user.preferences,
            savedTrips: user.savedTrips
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

module.exports = { getUserProfile };
