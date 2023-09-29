const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,  
  };

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the Express server!' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
