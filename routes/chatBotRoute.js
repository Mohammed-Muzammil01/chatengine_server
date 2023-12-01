const express = require('express');
const {createChatBot, getChatBot} = require("../controllers/chatBotController");
const router = express.Router();

router.post('/createChatBot', createChatBot);
router.get('/getChatBot/:id', getChatBot);

module.exports = router;