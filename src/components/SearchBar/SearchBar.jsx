import React, { useState } from "react";
import "./SearchBar.css";
import { fetchWeatherByCity } from "../../services/weatherServices";

const SearchBar = ({ onCityWeather }) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const data = await fetchWeatherByCity(city);
      onCityWeather(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("City not found.");
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={city}
        placeholder="Search city..."
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SearchBar;
