const API_KEY= import.meta.env.API_KEY;

export async function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=sv`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("API error");
  }

  const data = await response.json();
  return data;
}

export async function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=sv`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("City not found");
  }

  const data = await response.json();
  return data;
}
export async function fetchFiveDayForecast(city) {
  const API_KEY = "3b63f560ee4f6b89be73633606a4a1f8";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=sv`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Forecast not found");
  }

  const data = await response.json();
  return data;
}

