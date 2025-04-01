// Main file that handles all logic and brings everything together
// This is where I keep track of the weather, forecast, dark mode, and favorite cities
// I pass info down to the other components from here

import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherToday from "./components/WeatherToday/WeatherToday";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";
import Favorites from "./components/Favorites/Favorites";
import {
  fetchFiveDayForecast,
  fetchWeatherByCity,
} from "./services/weatherServices";

function App() {
  const [searchedWeather, setSearchedWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(false);

  const handleCityWeather = async (data) => {
    setSearchedWeather(data);
    try {
      const forecast = await fetchFiveDayForecast(data.name);
      setForecastData(forecast);
    } catch (err) {
      console.error("Failed to fetch forecast:", err);
    }
  };

  const handleFavoriteSelect = async (city) => {
    try {
      const data = await fetchWeatherByCity(city);
      setSearchedWeather(data);
      const forecast = await fetchFiveDayForecast(city);
      setForecastData(forecast);
    } catch (err) {
      console.error("Could not load favorite city:", err);
    }
  };

  const handleRemoveFavorite = (city) => {
    const updated = favorites.filter((fav) => fav !== city);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const saveToFavorites = () => {
    if (searchedWeather && !favorites.includes(searchedWeather.name)) {
      const updated = [...favorites, searchedWeather.name];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  const getWeatherMood = () => {
    if (!searchedWeather) return "default";
    const main = searchedWeather.weather[0].main.toLowerCase();
    if (main.includes("cloud")) return "cloudy";
    if (main.includes("rain")) return "rainy";
    if (main.includes("clear")) return "sunny";
    if (main.includes("snow")) return "snowy";
    return "default";
  };

  const moodClass = `app ${getWeatherMood()} ${darkMode ? "dark" : "light"}`;

  return (
    <div className={moodClass}>
      <button onClick={() => setDarkMode(!darkMode)} className="toggle-theme">
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
      <div className="container">
        <h1>My Weather App</h1>

        <SearchBar onCityWeather={handleCityWeather} />

        <div className="section">
          <Favorites
            favorites={favorites}
            onSelect={handleFavoriteSelect}
            onRemove={handleRemoveFavorite}
          />
        </div>

        {searchedWeather ? (
          <>
            <div className="weather-box section">
              <h2>Weather in {searchedWeather.name}</h2>
              <p>Temperature: {Math.round(searchedWeather.main.temp)}°C</p>
              <p>{searchedWeather.weather[0].description}</p>
              <p>{new Date().toLocaleDateString()}</p>
              <p>{new Date().toLocaleTimeString()}</p>
              <button onClick={saveToFavorites}>Save as Favorite</button>
            </div>

            {forecastData && (
              <div className="section">
                <WeatherDetails forecast={forecastData} />
              </div>
            )}
          </>
        ) : (
          <WeatherToday />
        )}
      </div>
    </div>
  );
}

export default App;
