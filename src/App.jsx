import React, { useState } from "react";
import WeatherToday from "./components/WeatherToday/WeatherToday";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";
import Favorites from "./components/Favorites/Favorites";
import {
  fetchFiveDayForecast,
  fetchWeatherByCity,
} from "./services/weatherServices";
import "./App.css";

function App() {
  const [searchedWeather, setSearchedWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const handleCityWeather = async (data) => {
    setSearchedWeather(data);
    try {
      const forecast = await fetchFiveDayForecast(data.name);
      setForecastData(forecast);
    } catch (err) {
      console.error("Forecast fetch failed:", err);
      setForecastData(null);
    }
  };

  const handleFavoriteSelect = async (city) => {
    try {
      const res = await fetchWeatherByCity(city);
      setSearchedWeather(res);
      const forecast = await fetchFiveDayForecast(city);
      setForecastData(forecast);
    } catch (err) {
      console.error("Could not load favorite city:", err);
    }
  };

  const handleSaveFavorite = () => {
    if (searchedWeather && !favorites.includes(searchedWeather.name)) {
      const updated = [...favorites, searchedWeather.name];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  const handleRemoveFavorite = (city) => {
    const updated = favorites.filter((fav) => fav !== city);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
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

  const moodClass = `app ${getWeatherMood()}`;

  return (
    <div className={moodClass}>
      <h1>My Weather App</h1>
      <SearchBar onCityWeather={handleCityWeather} />
      <Favorites
        favorites={favorites}
        onSelect={handleFavoriteSelect}
        onRemove={handleRemoveFavorite}
      />

      {searchedWeather ? (
        <>
          <div className="weather-box">
            <h2>Weather in {searchedWeather.name}</h2>
            <p>Temperature: {Math.round(searchedWeather.main.temp)}°C</p>
            <p>Weather: {searchedWeather.weather[0].description}</p>
            <p>Date: {new Date().toLocaleDateString()}</p>
            <p>Time: {new Date().toLocaleTimeString()}</p>
            <button onClick={handleSaveFavorite}>Spara som favorit</button>
          </div>

          {forecastData && <WeatherDetails forecast={forecastData} />}
        </>
      ) : (
        <WeatherToday />
      )}
    </div>
  );
}

export default App;
