// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send(`Express server is running on port ${PORT}`);
});

// Example Weather Proxy
app.get('/api/weather', async (req, res) => {
  const location = req.query.location || 'New York';
  console.log(`Fetching weather for: ${location}`);

  try {
    const url = `https://wttr.in/${encodeURIComponent(location)}?format=j1`;
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch weather' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});