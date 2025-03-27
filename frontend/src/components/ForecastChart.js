import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const ForecastChart = ({ forecastData }) => {
  const labels = forecastData.slice(0, 7).map((day) => day.datetime);
  const temperatures = forecastData.slice(0, 7).map((day) => day.temp);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatures,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h5 className="text-center mt-3">📈 7-Day Temperature Trend</h5>
      <Line data={data} />
    </div>
  );
};

export default ForecastChart;
