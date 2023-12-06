const mongoose = require("mongoose");

const ChatBotSchema = new mongoose.Schema({
  botId: String,
  botname: String,
  botIntent: String,
  botType: String
});

const ChatBot = mongoose.model('ChatBot', ChatBotSchema);

module.exports = ChatBot;
