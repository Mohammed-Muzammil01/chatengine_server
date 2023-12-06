const express = require('express');
const {createChatBot, getChatBot} = require("../controllers/chatBotController");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/createChatBot', authMiddleware, createChatBot);
router.get('/getChatBot/:id', authMiddleware, getChatBot);

module.exports = router;