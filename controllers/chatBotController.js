const ChatBot = require('../models/ChatBot');

const createChatBot = async (req, res) => {
    const { botname, botIntent, owner } = req.body;
    try {
        const response = await ChatBot.create({
            botname,
            botIntent,
            owner: "newOwner"
        });
        res.status(201).json({ message: 'Chatbot created successfully', chatbot: response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while creating the chatbot' });
    }
};


const getChatBot = async (req, res) => {
    const { id } = req.params;
    try {
        const chatbot = await ChatBot.findById(id);
        if (!chatbot) {
            return res.status(404).json({ message: 'Chatbot not found' });
        }
        res.status(200).json(chatbot); 
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching the chatbot' });
    }
};

module.exports = {createChatBot, getChatBot};