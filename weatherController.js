const weatherService = require('./weatherService');

const getWeatherByCity = async (req, res) => {
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).json({ message: 'City is required' });
        }
        const data = await weatherService.getWeather(city);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getWeatherByCity };
