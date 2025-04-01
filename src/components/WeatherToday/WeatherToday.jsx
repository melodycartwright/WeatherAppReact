import React, { useEffect, useState } from "react";
import "./WeatherToday.css";
import { fetchWeatherByCoords } from "../../services/weatherServices";

const WeatherToday = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await fetchWeatherByCoords(
            pos.coords.latitude,
            pos.coords.longitude
          );
          setWeather(data);
        } catch {
          setError("Could not retrieve weather for your location.");
        }
      },
      () => {
        setError("Location access denied.");
      }
    );
  }, []);

  if (error) return <p>{error}</p>;
  if (!weather) return <p>Loading weather...</p>;

  return (
    <div className="weather-box weather-today">
      <h2>Weather in your area ({weather.name})</h2>
      <p>{weather.weather[0].description}</p>
      <p>Temperature: {Math.round(weather.main.temp)}°C</p>
    </div>
  );
};

export default WeatherToday;
