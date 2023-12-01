const mongoose = require('mongoose');

const ChatBotSchema = new mongoose.Schema({
  botname: String,
  botIntent: String,
  owner: String,
});

const ChatBot = mongoose.model('ChatBot', ChatBotSchema);

module.exports = ChatBot;