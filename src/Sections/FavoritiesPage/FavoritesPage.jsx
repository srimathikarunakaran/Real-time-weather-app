import React from "react";
import "./FavoritesPage.css";

const FavoritesPage = ({ favorites, setForecastData, setHasSearched, setActiveTab }) => {
  
  const handleCityClick = (cityData) => {
    setForecastData(cityData);
    setHasSearched(true);
    setActiveTab("home"); // Switch back to home to see the full dashboard
  };

  return (
    <div className="favorites-page">
      <h1 className="page-title">Favorite Cities</h1>
      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>You haven't saved any cities yet.</p>
          <span>Search for a city and click the heart icon to save it!</span>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((city) => {
            // Because we use the /forecast endpoint, current weather is in list[0]
            const currentData = city.list ? city.list[0] : null;
            
            if (!currentData) return null;

            return (
              <div 
                key={city.city.id} // Use unique City ID from API instead of index
                className="favorite-card" 
                onClick={() => handleCityClick(city)}
              >
                <div className="fav-city-info">
                  {/* Accessing the nested city name from forecast data */}
                  <h3>{city.city.name}</h3>
                  <p>{currentData.weather[0].description}</p>
                </div>
                <div className="fav-temp">
                  <h2>{Math.round(currentData.main.temp)}°C</h2>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;