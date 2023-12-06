const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    pfp: String,
    chatbot: [{
        
    }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;