const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    pfp: String,
    chatbot: [{
        
    }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;