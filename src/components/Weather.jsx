// src/components/Weather.jsx
import React, { useState } from "react";

const API_KEY = "YOUR_API_KEY"; 
const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!city) return;

    setLoading(true);
    setWeatherData(null);

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

      {/* Loading message */}
      <p>{loading ? "Loading data…" : ""}</p>

      {/* Weather cards container */}
      <div className="weather-cards">
        {weatherData && (
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
