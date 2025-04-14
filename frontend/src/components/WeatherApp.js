import React, { useState } from "react";
import axios from "axios";
import ForecastChart from "./ForecastChart";
import { motion } from "framer-motion";
import "./styles.css";

const WeatherApp = ({ theme, setTheme }) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useLocation, setUseLocation] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      if (useLocation) {
        navigator.geolocation.getCurrentPosition(
          async ({ coords }) => {
            const url = `http://localhost:5000/weather?lat=${coords.latitude}&lon=${coords.longitude}`;
            const response = await axios.get(url);
            setWeather(response.data);
            setLoading(false);
          },
          () => {
            setError("Location access denied.");
            setLoading(false);
          }
        );
      } else {
        if (!city) {
          setError("Please enter a city name.");
          setLoading(false);
          return;
        }
        const url = `http://localhost:5000/weather?city=${encodeURIComponent(city)}`;
        const response = await axios.get(url);
        setWeather(response.data);
        setLoading(false);
      }
    } catch {
      setError("Error fetching weather.");
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="app-wrapper"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="theme-toggle d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">🌦 Weather Forecast</h2>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="themeSwitch"
            checked={theme === "dark"}
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
          />
          <label className="form-check-label" htmlFor="themeSwitch">
            {theme === "dark" ? "🌙 Dark" : "🌞 Light"}
          </label>
        </div>
      </div>

      <div className="mb-3 form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="locationSwitch"
          checked={useLocation}
          onChange={() => setUseLocation(!useLocation)}
        />
        <label className="form-check-label" htmlFor="locationSwitch">
          Use My Location
        </label>
      </div>

      {!useLocation && (
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      )}

      <button className="btn btn-primary w-100 mb-4" onClick={fetchWeather}>
        Get Weather
      </button>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {weather && weather.currentConditions && (
        <motion.div
          className="weather-container"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="card weather-card mx-auto shadow">
            <div className="card-body text-center">
              <h4>{weather.resolvedAddress}</h4>
              <p>{weather.currentConditions.conditions}</p>
              <img
                src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/3rd%20Set%20-%20Color/${weather.currentConditions.icon}.png`}
                alt="weather icon"
                className="weather-icon"
              />
              <h2>{weather.currentConditions.temp}°C</h2>
              <p>Humidity: {weather.currentConditions.humidity}%</p>
              <p>Wind: {weather.currentConditions.windspeed} kph</p>
            </div>
          </div>

          {weather.days && <ForecastChart forecastData={weather.days} />}
        </motion.div>
      )}
    </motion.div>
  );
};

export default WeatherApp;
