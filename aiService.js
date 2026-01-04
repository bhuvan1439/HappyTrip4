const weatherService = require('./weatherService');

const processMessage = async (message) => {
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes('weather') && lowerMsg.includes('in')) {
        const city = lowerMsg.split('in')[1].trim().replace('?', '');
        try {
            const weather = await weatherService.getWeather(city);
            if (weather.mock) {
                return `It's currently ${weather.main.temp}°C in ${weather.name} with ${weather.weather[0].description}. (Mock Data)`;
            }
            return `It's currently ${Math.round(weather.main.temp)}°C in ${weather.name} with ${weather.weather[0].description}.`;
        } catch (e) {
            return `I couldn't get the weather for ${city}. Please check the city name.`;
        }
    }

    if (lowerMsg.includes('plan') && lowerMsg.includes('trip')) {
        return "I can help you plan! Where would you like to go? Try asking 'Plan a trip to Paris'.";
    }

    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
        return "Hello! I'm MAHI, your travel assistant. How can I help you today?";
    }

    return "I'm still learning! Try asking about the weather (e.g., 'Weather in London') or planning a trip.";
};

module.exports = { processMessage };
