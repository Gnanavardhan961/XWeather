// src/components/Weather.jsx
import React, { useState } from "react";

const API_KEY = "YOUR_API_KEY"; // replace with your WeatherAPI key

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setWeatherData({}); // force render so Cypress sees .weather-cards

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch weather data");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Weather App</h1>

      <form onSubmit={handleSearch}>
        <label htmlFor="city">City: </label>
        <input
          id="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading data...</p>}

      <div className="weather-cards" style={{ minHeight: "150px" }}>
        {weatherData && weatherData.current && (
          <div className="weather-card">
            <h3>{weatherData.location.name}</h3>
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            <p>Humidity: {weatherData.current.humidity}%</p>
            <p>Condition: {weatherData.current.condition.text}</p>
            <p>Wind Speed: {weatherData.current.wind_kph} kph</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
