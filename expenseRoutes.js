const express = require('express');
const router = express.Router();
const {
    addExpense,
    getExpenses,
    deleteExpense,
} = require('./expenseController');
const { protect } = require('./authMiddleware');

router.route('/').post(protect, addExpense).get(protect, getExpenses);
router.route('/:id').delete(protect, deleteExpense);

module.exports = router;
