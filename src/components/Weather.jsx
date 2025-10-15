// src/components/Weather.jsx
import React, { useState } from "react";

const API_KEY = "YOUR_API_KEY";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);

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

  const renderCards = () => {
    if (!weatherData || !weatherData.current) return null;
    const { temp_c, humidity, condition, wind_kph } = weatherData.current;
    return (
      <>
        <div className="weather-card">
          <h3>Temperature</h3>
          <p>{temp_c}°C</p>
        </div>
        <div className="weather-card">
          <h3>Humidity</h3>
          <p>{humidity}%</p>
        </div>
        <div className="weather-card">
          <h3>Condition</h3>
          <p>{condition.text}</p>
        </div>
        <div className="weather-card">
          <h3>Wind Speed</h3>
          <p>{wind_kph} kph</p>
        </div>
      </>
    );
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
        {renderCards()}
      </div>
    </div>
  );
};

export default Weather;
