// Here I wrote my fetch functions
// This gets data from the OpenWeatherMap API using city name or GPS coordinates
// I call these functions from App.jsx when the user searches or loads a location

const API_KEY = import.meta.env.VITE_API_KEY;
console.log("Loaded API KEY:", API_KEY);
export async function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather");
  return await res.json();
}

export async function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("City not found");
  return await res.json();
}

export async function fetchFiveDayForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=en`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Forecast fetch failed");
  return await res.json();
}
