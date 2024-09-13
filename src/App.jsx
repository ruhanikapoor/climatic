import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import { fetchWeatherData } from "./services/weatherService";
import BgVideo from "./video/vid-bg.mp4";

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
      <video autoPlay loop muted className="bg-vid">
        <source src={BgVideo} type="video/mp4" />
      </video>
      <div className="content">
        <div className="header">
          <h1 className="aboreto">Climatic</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        {error && <p className="error-message">{error}</p>}
        {weatherData && (
          <div className="cards">
              <h2>Weather in {weatherData.name}</h2>

            <div className="card-division">
              <div className="info-card">
              <div>{weatherData.weather[0].description}</div>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="weather-icon"
              />
            </div>
            <div className="info-card weather-temp">
              <p>Temperature: {weatherData.main.temp} °C</p> <br />
              <p>Feels Like: {weatherData.main.feels_like} °C</p>
            </div>
            </div>

            <div className="card-division">
              <div className="info-card weather-temp">
              <p>Minimum Temperature: {weatherData.main.temp_min} °C</p> <br />
              <p>Maximum Temperature: {weatherData.main.temp_max} °C</p>
            </div>
            <div className="info-card">
              <p>Humidity: {weatherData.main.humidity}%</p>
            </div>
            </div>
            
            
          </div>
        )}
      </div>
    </div>
  );
};

export default App;