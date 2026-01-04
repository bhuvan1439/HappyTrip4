const Trip = require('./Trip');
const mongoose = require('mongoose');

// @desc    Create a new trip
// @route   POST /api/trips
// @access  Private
const createTrip = async (req, res) => {
    const { destination, startDate, endDate, budget, itinerary } = req.body;

    if (!destination || !startDate || !endDate || !budget) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }

    // Get current trip count for user to assign trip number
    const tripCount = await Trip.countDocuments({ user: req.user._id });
    const tripNumber = tripCount + 1;

    const trip = await Trip.create({
        user: req.user._id,
        destination,
        tripNumber,
        startDate,
        endDate,
        budget,
        itinerary: itinerary || []
    });

    res.status(201).json(trip);
};

// @desc    Get all trips for user
// @route   GET /api/trips
// @access  Private
const getTrips = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        // Mock Trips
        return res.json([
            {
                _id: 'mock_trip_1',
                destination: 'Jaipur, Rajasthan',
                tripNumber: 1,
                startDate: '2025-01-10',
                endDate: '2025-01-15',
                budget: '20000',
                status: 'Completed',
                itinerary: ['Amer Fort', 'Hawa Mahal', 'City Palace']
            },
            {
                _id: 'mock_trip_2',
                destination: 'Varanasi, UP',
                tripNumber: 2,
                startDate: '2024-12-01',
                endDate: '2024-12-05',
                budget: '15000',
                status: 'Completed',
                itinerary: ['Kashi Vishwanath', 'Ganga Aarti', 'Sarnath']
            }
        ]);
    }

    const trips = await Trip.find({ user: req.user._id });
    res.json(trips);
};

// @desc    Get trip by ID
// @route   GET /api/trips/:id
// @access  Private
const getTripById = async (req, res) => {
    const trip = await Trip.findById(req.params.id);

    if (trip && trip.user.toString() === req.user._id.toString()) {
        res.json(trip);
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
};

// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private
const updateTrip = async (req, res) => {
    const trip = await Trip.findById(req.params.id);

    if (trip && trip.user.toString() === req.user._id.toString()) {
        trip.destination = req.body.destination || trip.destination;
        trip.startDate = req.body.startDate || trip.startDate;
        trip.endDate = req.body.endDate || trip.endDate;
        trip.budget = req.body.budget || trip.budget;
        trip.itinerary = req.body.itinerary || trip.itinerary;

        const updatedTrip = await trip.save();
        res.json(updatedTrip);
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private
const deleteTrip = async (req, res) => {
    const trip = await Trip.findById(req.params.id);

    if (trip && trip.user.toString() === req.user._id.toString()) {
        await trip.remove();
        res.json({ message: 'Trip removed' });
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
};

module.exports = {
    createTrip,
    getTrips,
    getTripById,
    updateTrip,
    deleteTrip,
};
