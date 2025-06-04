const express = require('express');
const fetch = require('node-fetch'); // Only needed if Node < 18
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.get('/api/weather', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing lat or lon parameter' });
  }

  try {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`;

    const weatherRes = await fetch(weatherUrl);
    if (!weatherRes.ok) throw new Error('Failed to fetch weather');

    const weatherData = await weatherRes.json();

    // Return just the weather data
    res.json(weatherData.current_weather);
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});