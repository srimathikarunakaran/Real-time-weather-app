import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import About from "../../Components/About/About";
import WeatherDetails from "../../Sections/WeatherDetailCard/WeatherDetailCard";
import HourlyForecast from "../../Sections/HourlyForecast/HourlyForecast";
import WeeklyForecast from "../../Sections/WeeklyForecast/WeeklyForecast";
import FavoritesPage from "../../Sections/FavoritiesPage/FavoritesPage";
import SignInModal from "../../Components/SignInModal/SignInModal";
import "./Home.css";

const Home = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [hasSearched, setHasSearched] = useState(false);
  const [forecastData, setForecastData] = useState(null);
  
  // --- ERROR STATE ---
  const [errorMsg, setErrorMsg] = useState(null);

  // --- AUTH STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("weather-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // --- FAVORITES STATE ---
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("weather-favorites");
    // If it's your first time, it starts as an empty array []
    return saved ? JSON.parse(saved) : [];
  });

  // Keep LocalStorage updated whenever favorites change
  useEffect(() => {
    localStorage.setItem("weather-favorites", JSON.stringify(favorites));
  }, [favorites]);

  // --- HANDLERS ---
  const triggerError = (msg) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 3000);
  };

  const handleLogin = (name) => {
    const userData = { name };
    setUser(userData);
    localStorage.setItem("weather-user", JSON.stringify(userData));
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("weather-user");
    setActiveTab("home");
  };

  const toggleFavorite = (cityData) => {
    // 1. Must be logged in to favorite
    if (!user) {
      setIsModalOpen(true);
      return;
    }

    if (!cityData || !cityData.city) return;

    // 2. IMPORTANT FIX: Use cityData.city.name for forecast endpoint data
    setFavorites((prevFavorites) => {
      const cityName = cityData.city.name;
      const isExist = prevFavorites.find((fav) => fav.city.name === cityName);

      if (isExist) {
        // If it exists, remove it (unlike the heart)
        return prevFavorites.filter((fav) => fav.city.name !== cityName);
      } else {
        // If it's new, add it to the list
        return [...prevFavorites, cityData];
      }
    });
  };

  return (
    <div className="layout">
      {/* Sidebar handles Search and the Heart Button */}
      <Sidebar
        setHasSearched={setHasSearched}
        setForecastData={setForecastData}
        forecastData={forecastData}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        onError={triggerError} 
      />

      <main className="main-content">
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          user={user}
          handleLogout={handleLogout}
          openSignIn={() => setIsModalOpen(true)}
        />

        <div className="dashboard-body">
          {activeTab === "home" && (
            <div className="home-container">
              {!hasSearched ? (
                <div className="welcome-message">
                  <h1>Let's Check the Weather!</h1>
                  <p>Use the search bar on the left to find your city.</p>
                </div>
              ) : (
                <div className="weather-data-area">
                  <div className="weather-split-layout">
                    <div className="weather-left">
                      <HourlyForecast data={forecastData} />
                      <WeeklyForecast data={forecastData} />
                    </div>
                    <div className="weather-right">
                      <WeatherDetails data={forecastData} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "about" && <About />}

          {activeTab === "favorites" && (
            <FavoritesPage 
              favorites={favorites} 
              setForecastData={setForecastData}
              setHasSearched={setHasSearched}
              setActiveTab={setActiveTab}
            />
          )}
        </div>
      </main>

      {/* FLOATING ERROR POPUP */}
      {errorMsg && (
        <div className="error-popup">
          <div className="error-content">
            <span className="error-icon">❌</span>
            <p>{errorMsg}</p>
          </div>
        </div>
      )}

      {/* SIGN IN MODAL */}
      <SignInModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onLogin={handleLogin} 
      />
    </div>
  );
};

export default Home;