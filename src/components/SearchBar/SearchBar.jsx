//searchbar for city weather
import React, { useState } from "react";
import { fetchWeatherByCity } from "../../../src/services/weatherServices";
import "./SearchBar.css";

const SearchBar = ({ onCityWeather }) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const data = await fetchWeatherByCity(city);
      onCityWeather(data);
      setError("");
    } catch (err) {
      setError("City not found.");
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={city}
        placeholder="Enter city..."
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SearchBar;
