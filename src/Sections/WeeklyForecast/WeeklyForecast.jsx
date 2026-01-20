import React from "react";
import "./WeeklyForecast.css";

// Your custom imports
import ClearImg from "../../Images/clear.png";
import CloudsImg from "../../Images/clouds.png";
import CloudyImg from "../../Images/cloudy.png";
import DrizzleImg from "../../Images/drizzle.png";
import MistImg from "../../Images/mist.png";
import RainyImg from "../../Images/rainy-day.png";
import SnowImg from "../../Images/snow.png"; // Added Snow import

const WeeklyForecast = ({ data }) => {
  if (!data || !data.list) return null;

  // Mapping function for your custom images
  const getCustomIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return ClearImg;
      case "Clouds":
        return CloudsImg;
      case "Drizzle":
        return DrizzleImg;
      case "Rain":
        return RainyImg;
      case "Snow":
        return SnowImg;
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Fog":
        return MistImg;
      default:
        return CloudyImg;
    }
  };

  // Filter to get one entry per day (around noon)
  const dailyData = data.list.filter((item) => item.dt_txt.includes("12:00:00"));

  return (
    <div className="weekly-card-container">
      <h3 className="section-title">5-Day Forecast</h3>
      <div className="weekly-list">
        {dailyData.map((item, index) => {
          const condition = item.weather[0].main;
          
          return (
            <div className="day-row" key={index}>
              <span className="day-name">
                {new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              
              <div className="day-condition">
                {/* Using your custom image mapping */}
                <img 
                  src={getCustomIcon(condition)} 
                  alt={condition} 
                  className="weekly-weather-icon"
                />
                <span className="condition-text">{condition}</span>
              </div>

              <span className="day-temps">
                <span className="high">{Math.round(item.main.temp_max)}°</span>
                <span className="low"> / {Math.round(item.main.temp_min)}°</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyForecast;