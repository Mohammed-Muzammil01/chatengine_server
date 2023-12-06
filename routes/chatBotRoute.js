const express = require('express');
const {createChatBot, getChatBot, getAllChatBots} = require("../controllers/chatBotController");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/createChatBot', authMiddleware, createChatBot);
router.get('/getChatBot/:id', getChatBot);
router.get('/getAllChatBots', authMiddleware, getAllChatBots);

module.exports = router;