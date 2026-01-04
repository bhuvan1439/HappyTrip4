const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');
const path = require('path');

const authRoutes = require('./authRoutes');
const weatherRoutes = require('./weatherRoutes');
const mapRoutes = require('./mapRoutes');
const aiRoutes = require('./aiRoutes');
const foodRoutes = require('./foodRoutes');
const tripRoutes = require('./tripRoutes');
const expenseRoutes = require('./expenseRoutes');
const placeRoutes = require('./placeRoutes');
const userRoutes = require('./userRoutes');
const { notFound, errorHandler } = require('./errorMiddleware');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname))); // Serve all static files from root

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/maps', mapRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
