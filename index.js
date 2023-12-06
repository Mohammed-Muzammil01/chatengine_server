const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const authenticateToken = require('./middleware/authMiddleware');
// const passport = require("passport");
// const passportSetup = require("./passport");
// const authRoute = require('./routes/auth.js');
// const cookieSession = require("cookie-session");

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

// app.use(
//     cookieSession({
//         name:"session",
//         keys: ["codeCrafters"],
//         maxAge: 24 * 60 * 60 * 1000,
//     })
// );

// app.use(passport.initialize());
// app.use(passport.session());


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
// app.use('/auth', authRoute);

//user auth section
// Register a new user
app.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      res.json({ success: true, message: 'User registered successfully.' });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  });
  
  // User login
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
  
    if (!user) {
      return res.json({ success: false, message: 'Invalid username or password.' });
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      return res.json({ success: false, message: 'Invalid username or password.' });
    }
  
    // Generate and send JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ success: true, token });
  });
  
  // Protected route - example
  app.get('/profile', authenticateToken, (req, res) => {
    res.json({ success: true, message: 'Protected route accessed successfully.' });
  });
  
   

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
