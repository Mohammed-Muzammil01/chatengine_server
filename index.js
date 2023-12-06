const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const authenticateToken = require('./middleware/authMiddleware');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

require('dotenv').config(); 
 
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
};

app.use(cors(corsOptions));


const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use('/chatbot', require('./routes/chatBotRoute'));

//user auth section 
// Register a new user
app.post('/register', async (req, res) => {
    try {
      const { username, email, pass } = req.body;
      const hashedPassword = await bcrypt.hash(pass, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '30d' });
      res.status(201).json({ success: true, token });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }); 
  
  // User login
  app.post('/login', async (req, res) => {
    const { username, pass } = req.body; 
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }    
    const isPasswordValid = await bcrypt.compare(pass, user.password);
  
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }
  
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '30d' });
    res.status(200).json({ success: true, token });
  });
  
  // Protected route - example
  app.get('/profile', authenticateToken, (req, res) => {
    res.json({ success: true, message: 'Protected route accessed successfully.' });
  });
   

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
