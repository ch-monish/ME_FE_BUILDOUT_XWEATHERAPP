import React, { useState } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    const API_KEY="4e34977bacce4f09979110859260203"
    if (!city) return;

    setLoading(true);
    setWeather(null); // Clear previous results
 
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeather({
        temp: data.current.temp_c,
        humidity: data.current.humidity,
        condition: data.current.condition.text,
        wind: data.current.wind_kph,
      });
    } catch (e) {
      alert('Failed to fetch weather data'+e);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="weather-app">
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Search</button>

      {loading && <p>Loading data...</p>}

      {weather && !loading && (
        <div className="weather-cards">
          <div className="weather-card">Temperature: {weather.temp}°C</div>
          <div className="weather-card">Humidity: {weather.humidity}%</div>
          <div className="weather-card">Condition: {weather.condition}</div>
          <div className="weather-card">Wind Speed: {weather.wind} kph</div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;