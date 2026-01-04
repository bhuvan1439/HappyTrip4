const aiService = require('./aiService');

const chat = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }
        const reply = await aiService.processMessage(message);
        res.json({ reply });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { chat };
