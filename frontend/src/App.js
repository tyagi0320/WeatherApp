import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherApp from "./components/WeatherApp";

function App() {
  const [theme, setTheme] = useState("light");

  // Apply theme to <body>
  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <div>
      <WeatherApp theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default App;
