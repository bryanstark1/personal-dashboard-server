// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Express server is running on Raspberry Pi');
});

// Example Weather Proxy
app.get('/api/weather', async (req, res) => {
  const lat = req.query.lat || '40.7128';
  const lon = req.query.lon || '-74.0060';
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});