import React, { useState } from "react";
import "./Navbar.css";

const Navbar = ({ activeTab, setActiveTab, user, handleLogout, openSignIn }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Helper to get the first letter
  const getInitial = () => {
    if (user && user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return "";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Weather App</h2>
      </div>

      <div className="nav-right">
        <ul className="nav-text">
          <li
            className={activeTab === "home" ? "active" : ""}
            onClick={() => setActiveTab("home")}
          >
            Home
          </li>
          <li
            className={activeTab === "about" ? "active" : ""}
            onClick={() => setActiveTab("about")}
          >
            About
          </li>
          <li
            className={activeTab === "favorites" ? "active" : ""}
            onClick={() => setActiveTab("favorites")}
          >
            Favorite Cities
          </li>
        </ul>

        <div className="auth-area">
          {!user ? (
            // If no user, show the Sign In button that opens the Modal
            <button className="btn" onClick={openSignIn}>
              Sign In
            </button>
          ) : (
            // If user exists, show the Avatar and Dropdown
            <div className="user-profile-wrapper">
              <div 
                className="avatar-circle" 
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {getInitial()}
              </div>

              {showDropdown && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <span className="user-name-tag">Hi, {user.name}</span>
                  </div>
                  <button className="logout-item" onClick={() => {
                    handleLogout();
                    setShowDropdown(false);
                  }}>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;