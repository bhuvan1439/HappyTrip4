const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    destination: {
        type: String,
        required: true,
    },
    tripNumber: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    itinerary: [{
        day: Number,
        activities: [{
            time: String,
            activity: String,
            location: String,
            cost: Number
        }]
    }],
}, {
    timestamps: true,
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
