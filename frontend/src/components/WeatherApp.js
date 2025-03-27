import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ForecastChart from "./ForecastChart";
import "./styles.css"; 

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:5000/weather?city=${city}`);
      setWeather(response.data);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🌤️ Weather Forecast App</h2>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchWeather}>Get Weather</button>
      </div>

      {loading && <p className="text-center">Fetching weather data...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {weather && weather.currentConditions && (
        <div className="weather-container">
          <div className="card mx-auto" style={{ maxWidth: "450px" }}>
            <div className="card-body text-center">
              <h4>{weather.resolvedAddress}</h4>
              <p>{weather.currentConditions.conditions}</p>
              <img
                src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/3rd%20Set%20-%20Color/${weather.currentConditions.icon}.png`}
                alt="weather icon"
                className="weather-icon"
              />
              <h3>{weather.currentConditions.temp}°C</h3>
              <p>Humidity: {weather.currentConditions.humidity}%</p>
              <p>Wind Speed: {weather.currentConditions.windspeed} kph</p>
            </div>
          </div>

          {/* 7-Day Forecast Chart */}
          {weather.days && <ForecastChart forecastData={weather.days} />}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
