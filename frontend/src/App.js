import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import WeatherApp from "./components/WeatherApp"; // Import WeatherApp component

function App() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Weather Forecast</h1>
      <WeatherApp />
    </div>
  );
}

export default App;
