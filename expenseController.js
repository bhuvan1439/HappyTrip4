const Expense = require('./Expense');

// @desc    Add new expense
// @route   POST /api/expenses
// @access  Private
const addExpense = async (req, res) => {
    const { description, amount, category, tripNumber, date } = req.body;

    if (!description || !amount || !category || !tripNumber) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }

    const expense = await Expense.create({
        user: req.user._id,
        description,
        amount,
        category,
        tripNumber,
        date: date || Date.now(),
    });

    res.status(201).json(expense);
};

// @desc    Get all expenses for user
// @route   GET /api/expenses
// @access  Private
const getExpenses = async (req, res) => {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
    res.json(expenses);
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = async (req, res) => {
    const expense = await Expense.findById(req.params.id);

    if (expense && expense.user.toString() === req.user._id.toString()) {
        await expense.deleteOne();
        res.json({ message: 'Expense removed' });
    } else {
        res.status(404);
        throw new Error('Expense not found');
    }
};

module.exports = {
    addExpense,
    getExpenses,
    deleteExpense,
};
