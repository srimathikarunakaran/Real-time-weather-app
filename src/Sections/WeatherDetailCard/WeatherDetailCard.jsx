import React from "react";
import "./WeatherDetailCard.css";

const WeatherDetails = ({ data }) => {
  if (!data || !data.list) return null;
  const current = data.list[0];

  // Dew Point is often not in the basic free API, so we calculate it roughly
  // or use the 'main.temp' if you want a placeholder.
  const dewPoint = Math.round(current.main.temp - ((100 - current.main.humidity) / 5));

  return (
    <div className="details-card-container">
      <h3 className="section-title">Weather Details</h3>
      <div className="details-grid">
        
        <div className="detail-box">
          <span className="label">FEELS LIKE</span>
          <p className="value">{Math.round(current.main.feels_like)}°</p>
        </div>

        <div className="detail-box">
          <span className="label">HUMIDITY</span>
          <p className="value">{current.main.humidity}%</p>
        </div>

        <div className="detail-box">
          <span className="label">WIND SPEED</span>
          <p className="value">{current.wind.speed} km/h</p>
        </div>

        <div className="detail-box">
          <span className="label">VISIBILITY</span>
          <p className="value">{current.visibility / 1000} km</p>
        </div>

        <div className="detail-box">
          <span className="label">PRESSURE</span>
          <p className="value">{current.main.pressure} hPa</p>
        </div>

        <div className="detail-box">
          <span className="label">CHANCE OF RAIN</span>
          <p className="value">{Math.round(current.pop * 100)}%</p>
        </div>

        {/* NEW TILE 1: UV INDEX (Placeholder as it requires a separate API call usually) */}
        <div className="detail-box">
          <span className="label">UV INDEX</span>
          <p className="value">3 <span style={{fontSize: '0.7rem', opacity: 0.5}}>Med</span></p>
        </div>

        {/* NEW TILE 2: DEW POINT */}
        <div className="detail-box">
          <span className="label">DEW POINT</span>
          <p className={dewPoint > 20 ? "value warning" : "value"}>{dewPoint}°</p>
        </div>

      </div>
    </div>
  );
};

export default WeatherDetails;