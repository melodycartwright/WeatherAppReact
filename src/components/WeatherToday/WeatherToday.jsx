//Weather for current Location
import React, { useEffect, useState } from "react";

import "./WeatherToday.css";

const WeatherToday = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await fetchWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            setWeather(data);
          } catch (err) {
            setError("Could not retrieve weather data.");
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError("Location services blocked.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation not supported.");
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="weather-today">
      <h2>Today's Weather in {weather.name}</h2>
      <p>Temperature: {Math.round(weather.main.temp)}°C</p>
      <p>Weather: {weather.weather[0].description}</p>
      <p>Date: {new Date().toLocaleDateString()}</p>
      <p>Time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
};

export default WeatherToday;