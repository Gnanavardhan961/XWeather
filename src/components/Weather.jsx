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

  const renderCard = (title, value) => (
    <div className="weather-card">
      <h3>{title}</h3>
      <p>{value || "---"}</p>
    </div>
  );

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
        {renderCard("Temperature", weatherData?.current?.temp_c + "°C")}
        {renderCard("Humidity", weatherData?.current?.humidity + "%")}
        {renderCard("Condition", weatherData?.current?.condition?.text)}
        {renderCard("Wind Speed", weatherData?.current?.wind_kph + " kph")}
      </div>
    </div>
  );
};

export default Weather;
