import React from "react";
import "./WeatherDetails.css";

const WeatherDetails = ({ forecast }) => {
  if (!forecast?.list) return <p>No forecast available.</p>;

  const grouped = {};
  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });

  const daily = Object.entries(grouped)
    .slice(0, 5)
    .map(([date, values]) => {
      const temps = values.map((v) => v.main.temp);
      const icon = values[0].weather[0].icon;
      const description = values[0].weather[0].description;

      return {
        date,
        min: Math.min(...temps),
        max: Math.max(...temps),
        icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        description,
      };
    });

  return (
    <div className="forecast-container">
      <h3 style={{ marginBottom: "1rem" }}>5-Day Forecast</h3>
      <div className="forecast-grid">
        {daily.map((day, i) => (
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
