import React, { useState } from "react";
import "./SignInModal.css";

const SignInModal = ({ isOpen, onClose, onLogin }) => {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name); // Sends name back to Home.jsx
      onClose();     // Closes the popup
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <h2>Sign In</h2>
        <p>Welcome back! Please enter your name.</p>

        <form className="signin-form" onSubmit={handleSubmit}>
          {/* We use name here to get that first letter for the Avatar */}
          <input 
            type="text" 
            placeholder="Your Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
          <input type="password" placeholder="Password" required />

          <button type="submit" className="signin-btn">
            Sign In
          </button>
        </form>

        <span className="signup-text">
          Don’t have an account? <b>Sign Up</b>
        </span>
      </div>
    </div>
  );
};

export default SignInModal;