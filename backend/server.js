require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

app.get("/weather", async (req, res) => {
  try {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
      return res.status(400).json({ error: "City or coordinates required!" });
    }

    const location = city ? city : `${lat},${lon}`;
    const url = `${BASE_URL}/${encodeURIComponent(location)}?key=${API_KEY}&unitGroup=metric&include=current,days`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Weather API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
