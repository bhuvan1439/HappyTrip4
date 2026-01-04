const axios = require('axios');

const getWeather = async (city) => {
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
        // Return mock data if no key
        return {
            name: city,
            main: {
                temp: 25,
                humidity: 60
            },
            weather: [
                { main: 'Sunny', description: 'clear sky' }
            ],
            wind: {
                speed: 5
            },
            mock: true
        };
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    return response.data;
};

module.exports = { getWeather };
