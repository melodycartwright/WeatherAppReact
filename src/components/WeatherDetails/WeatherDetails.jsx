//Detailed 5 day forecast min/max
import React from "react";
import "./WeatherDetails.css";

const WeatherDetails = ({ forecast }) => {
  // Group forecast by day
  const grouped = {};

  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });

  const dailyForecast = Object.entries(grouped)
    .slice(0, 5)
    .map(([date, values]) => {
      const temps = values.map((v) => v.main.temp);
      const icons = values.map((v) => v.weather[0].icon);
      const description = values[0].weather[0].description;

      return {
        date,
        min: Math.min(...temps),
        max: Math.max(...temps),
        icon: `https://openweathermap.org/img/wn/${icons[0]}@2x.png`,
        description,
      };
    });

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {dailyForecast.map((day, i) => (
          <div className="forecast-card" key={i}>
            <p>{day.date}</p>
            <img src={day.icon} alt={day.description} />
            <p>{day.description}</p>
            <p>Min: {Math.round(day.min)}°C</p>
            <p>Max: {Math.round(day.max)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
