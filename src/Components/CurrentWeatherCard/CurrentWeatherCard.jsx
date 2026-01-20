import React, { useState, useEffect } from "react";
import "./CurrentWeatherCard.css";

import ClearImg from "../../Images/clear.png";
import CloudsImg from "../../Images/clouds.png";
import CloudyImg from "../../Images/cloudy.png";
import DrizzleImg from "../../Images/drizzle.png";
import MistImg from "../../Images/mist.png";
import RainyImg from "../../Images/rainy-day.png";
import SnowImg from '../../Images/snow.png';

const API_KEY = "8ad8dc5b7e219e778fc36f6b2543b2b2";

// Added onError to props to trigger the Home-level popup
const CurrentWeatherCard = ({ setHasSearched, setForecastData, onError }) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (queryCity, lat, lon) => {
    setLoading(true);
    // Don't clear weather immediately so the screen doesn't jump
    
    let url = "";
    if (queryCity) {
      url = `https://api.openweathermap.org/data/2.5/forecast?q=${queryCity}&units=metric&appid=${API_KEY}`;
    } else if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    } else {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(url);
      
      if (!res.ok) {
        // TRIGGER THE POPUP: If city is wrong, this sends the signal to Home.jsx
        if (onError) onError(`Oops! "${queryCity}" isn't a city we can find.`);
        throw new Error("City not found");
      }
      
      const data = await res.json();

      const current = data.list[0];
      setWeather({
        city: data.city.name,
        temp: current.main.temp,
        condition: current.weather[0].main,
      });

      if (setForecastData) setForecastData(data);
      if (setHasSearched) setHasSearched(true);
      setCity(""); // Clear search bar on success

    } catch (err) {
      console.error(err);
      // We don't set a local error state anymore because onError handles the popup!
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeather(null, pos.coords.latitude, pos.coords.longitude);
        },
        (err) => console.warn("Geolocation blocked:", err)
      );
    }
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clouds": return CloudsImg;
      case "Rain": return RainyImg;
      case "Clear": return ClearImg;
      case "Mist": return MistImg;
      case "Drizzle": return DrizzleImg;
      case "Snow": return SnowImg; // Fixed "snow" to "Snow" to match API casing
      default: return CloudyImg;
    }
  };

  const getWeatherTip = (condition) => {
    switch (condition) {
      case "Rain": return "☔ Don't forget an umbrella!";
      case "Clear": return "🌞 Stay hydrated!";
      case "Clouds": return "☁️ A light jacket might be good.";
      case "Mist": return "🌫️ Drive carefully.";
      case "Drizzle": return "🌦️ Take an umbrella just in case.";
      case "Snow": return "❄️ Bundle up, it's cold!";
      default: return "Have a great day!";
    }
  };

  return (
    <div className="Card">
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather(city)}
        />
      </div>

      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Finding {city}...</p>
        </div>
      )}

      {weather && !loading && (
        <div className="weather-details-container">
          <div className="city-condition-row">
            <p className="city-name">{weather.city}</p>
            <span className="condition-text-pill">{weather.condition}</span>
          </div>

          <img
            src={getWeatherIcon(weather.condition)}
            alt={weather.condition}
            className="weather-icon"
          />

          <h1 className="temp">{Math.round(weather.temp)}°C</h1>
          <p className="weather-tip">{getWeatherTip(weather.condition)}</p>
        </div>
      )}
    </div>
  );
};

export default CurrentWeatherCard;