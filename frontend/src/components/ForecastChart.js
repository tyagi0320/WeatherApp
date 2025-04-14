import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

Chart.register(...registerables);

const ForecastChart = ({ forecastData }) => {
  const labels = forecastData.slice(0, 7).map((day) => day.datetime);
  const temperatures = forecastData.slice(0, 7).map((day) => day.temp);
  const humidity = forecastData.slice(0, 7).map((day) => day.humidity);
  const windSpeed = forecastData.slice(0, 7).map((day) => day.windspeed);

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 6,
        hoverRadius: 8,
      },
    },
  };

  const temperatureData = {
    labels: labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatures,
        borderColor: "#FF5733", // Vibrant orange-red color
        backgroundColor: "rgba(255, 87, 51, 0.2)", // Light orange background
        borderWidth: 2,
        pointBackgroundColor: "#FF5733",
        pointBorderColor: "#fff",
      },
    ],
  };

  const humidityData = {
    labels: labels,
    datasets: [
      {
        label: "Humidity (%)",
        data: humidity,
        borderColor: "#3498db", // Blue color
        backgroundColor: "rgba(52, 152, 219, 0.2)", // Light blue background
        borderWidth: 2,
        pointBackgroundColor: "#3498db",
        pointBorderColor: "#fff",
      },
    ],
  };

  const windSpeedData = {
    labels: labels,
    datasets: [
      {
        label: "Wind Speed (kph)",
        data: windSpeed,
        borderColor: "#2ecc71", // Green color
        backgroundColor: "rgba(46, 204, 113, 0.2)", // Light green background
        borderWidth: 2,
        pointBackgroundColor: "#2ecc71",
        pointBorderColor: "#fff",
      },
    ],
  };

  return (
    <div className="container mt-4">
      {/* Card for Temperature Trend */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title text-center">📈 7-Day Temperature Trend</h5>
          <Line data={temperatureData} options={chartOptions} />
        </div>
      </div>

      {/* Card for Humidity Trend */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title text-center">💧 7-Day Humidity Trend</h5>
          <Line data={humidityData} options={chartOptions} />
        </div>
      </div>

      {/* Card for Wind Speed Trend */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title text-center">💨 7-Day Wind Speed Trend</h5>
          <Line data={windSpeedData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ForecastChart;
