import React from "react";
import "./HourlyForecast.css";

// Your custom imports
import ClearImg from "../../Images/clear.png";
import CloudsImg from "../../Images/clouds.png";
import CloudyImg from "../../Images/cloudy.png";
import DrizzleImg from "../../Images/drizzle.png";
import MistImg from "../../Images/mist.png";
import RainyImg from "../../Images/rainy-day.png";
import SnowImg from '../../Images/snow.png';

const HourlyForecast = ({ data }) => {
  if (!data || !data.list) return null;

  // 1. Define the mapping logic based on the "main" weather condition
  const getCustomIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return ClearImg;
      case "Clouds":
        return CloudsImg; // You can use CloudyImg here if preferred
      case "Drizzle":
        return DrizzleImg;
      case "Rain":
        return RainyImg;
      case "snow":
        return SnowImg;
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Fog":
        return MistImg;
      default:
        return CloudyImg; // Fallback image
    }
  };

  const hourlyData = data.list.slice(0, 8);

  return (
    <div className="hourly-card-container">
      <h3 className="section-title">24-Hour Forecast</h3>
      <div className="hourly-row">
        {hourlyData.map((item, index) => {
          // Get the main weather condition string (e.g., "Rain")
          const condition = item.weather[0].main;
          
          return (
            <div className="hour-item" key={index}>
              <p className="time">
                {new Date(item.dt * 1000).getHours()}:00
              </p>
              
              {/* 2. Apply your custom image */}
              <img 
                src={getCustomIcon(condition)} 
                alt={condition} 
                className="hourly-weather-icon"
              />
              
              <p className="temp">{Math.round(item.main.temp)}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;