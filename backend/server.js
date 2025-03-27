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

// Route to get weather by city name
app.get("/weather", async (req, res) => {
    try {
        const { city, date1, date2 } = req.query;
        if (!city) {
            return res.status(400).json({ error: "City is required!" });
        }

        // Build API URL
        let url = `${BASE_URL}/${encodeURIComponent(city)}?key=${API_KEY}&unitGroup=metric&include=current`;

        // If date1 is provided, add it to the request
        if (date1) {
            url = `${BASE_URL}/${encodeURIComponent(city)}/${date1}`;
        }

        // If both date1 and date2 are provided, fetch a date range
        if (date1 && date2) {
            url = `${BASE_URL}/${encodeURIComponent(city)}/${date1}/${date2}`;
        }

        // Fetch data from Visual Crossing API
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
