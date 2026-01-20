import "./Sidebar.css";
import CurrentWeatherCard from "../CurrentWeatherCard/CurrentWeatherCard";

const Sidebar = ({ setHasSearched, setForecastData, forecastData, favorites, toggleFavorite, onError }) => {
  
  // FIX: Look inside forecastData.city.name to match the Home.jsx logic
  const isFavorite = favorites?.some(fav => fav.city.name === forecastData?.city.name);

  return (
    <aside className="sidebar">
      <div className="sidebar-mobile-header">
        <h2 className="logo">Weather App</h2>
        <button className="btn-signin">Sign In</button>
      </div>

      <CurrentWeatherCard 
        setHasSearched={setHasSearched} 
        setForecastData={setForecastData} 
        onError={onError} 
      />

      {forecastData && (
        <div className="city-header">
          <div className="city-info-group">
             {/* Use city.name here too for consistency */}
             <h2 className="city-name">{forecastData.city.name}</h2>
             <p className="country-code">{forecastData.city.country}</p>
          </div>
          <button 
            className={`fav-btn ${isFavorite ? 'active' : ''}`}
            onClick={() => toggleFavorite(forecastData)}
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            {/* Now this will toggle correctly! */}
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;