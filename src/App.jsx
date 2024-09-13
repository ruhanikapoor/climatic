import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import { fetchWeatherData } from "./services/weatherService";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (cityName) => {
    setError(null);
    try {
      const data = await fetchWeatherData(cityName);
      setWeatherData(data);
    } catch (err) {
      setError("Unable to fetch weather data. Please try again.");
      setWeatherData(null);
    }
  };
  return (
    <div className="app-container">
      <h1>Climatic</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p className='error-message'>{error}</p>}
      {weatherData && (
        <div className="weather-display">
          {console.log(weatherData)}
          <h2>Weather in {weatherData.name}</h2>
          <p>Weather: {weatherData.weather[0].description}</p>
          <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather icon" className="weather-icon"/>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Feels Like: {weatherData.main.feels_like} °C</p>
          <p>Minimum Temperature: {weatherData.main.temp_min} °C</p>
          <p>Maximum Temperature: {weatherData.main.temp_max} °C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  )
};

export default App;