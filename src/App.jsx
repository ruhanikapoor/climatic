import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import { fetchWeatherData } from "./services/weatherService";
import RainVideo from "./video/rain.mp4";
import SunnyVideo from "./video/sunny.mp4";
import FogVideo from "./video/fog.mp4";
import SnowVideo from "./video/snow.mp4";
import SandVideo from "./video/sand.mp4";
import TornadoVideo from "./video/tornado.mp4";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [videoSource, setVideoSource] = useState(SunnyVideo);

  const handleSearch = async (cityName) => {
    setError(null);
    try {
      const data = await fetchWeatherData(cityName);
      setWeatherData(data);
      changeBackgroundVideo(data.weather[0].id);
    } catch (err) {
      setError("Unable to fetch weather data. Please try again.");
      setWeatherData(null);
    }
  };

  const changeBackgroundVideo = (weatherCondition) => {
    if(weatherCondition >= 200 && weatherCondition <= 531 ){
      setVideoSource(RainVideo)
    }

    if(weatherCondition >= 600 && weatherCondition <= 622 ){
      setVideoSource(SnowVideo)
    }

    else if(weatherCondition >= 701 && weatherCondition <= 741 ){
      setVideoSource(FogVideo)
    }

    else if(weatherCondition >= 751 && weatherCondition <= 762 ){
      setVideoSource(SandVideo)
    }

    else if (weatherCondition >= 771 && weatherCondition <= 781 ){
      setVideoSource(TornadoVideo)
    }

    else{
      setVideoSource(SunnyVideo)
    }
  }

  return (
    <div className="app-container">
      <video key={videoSource} autoPlay loop muted className="bg-vid">
        <source src={videoSource} type="video/mp4" />
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
              <div>{weatherData.weather[0].main}</div>
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