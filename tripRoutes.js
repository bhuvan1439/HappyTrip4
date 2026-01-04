const express = require('express');
const router = express.Router();
const {
    createTrip,
    getTrips,
    getTripById,
    updateTrip,
    deleteTrip,
} = require('./tripController');
const { protect } = require('./authMiddleware');

router.route('/').post(protect, createTrip).get(protect, getTrips);
router.route('/:id').get(protect, getTripById).put(protect, updateTrip).delete(protect, deleteTrip);

module.exports = router;
