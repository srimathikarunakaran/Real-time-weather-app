import React from "react";
import "./About.css";

import weatherImg1 from "../../Images/weather2.webp";
import weatherImg2 from "../../Images/weather-about.jpg"

const About = () => {
  return (
    <div className="about-wrapper">

      {/* SECTION 1 */}
      <section className="about-section">
        <div className="about-text">
          <h1>About Our Weather App</h1>
          <p>
            Our Weather App is built to provide accurate and real-time weather
            information in a simple, clean, and user-friendly way.
          </p>
          <p>
            The goal of this application is to help users quickly understand
            current weather conditions without unnecessary complexity.
          </p>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="about-section split">
        <div className="about-text">
          <h2>What This App Offers</h2>
          <p>
            This application allows users to search for any city and instantly
            view essential weather details such as temperature, humidity, wind
            speed, and overall conditions.
          </p>
          <p>
            With a responsive layout, the app adapts smoothly to different screen
            sizes, providing a consistent experience across all devices.
          </p>
        </div>

        <div className="about-image">
          <img src={weatherImg1} alt="Weather conditions" />
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="about-section split reverse">
        <div className="about-text">
          <h2>Technology Behind the App</h2>
          <p>
            The Weather App is developed using React and follows a
            component-based architecture for better scalability and
            maintainability.
          </p>
          <p>
            Modern weather APIs are used to fetch real-time data, ensuring fast
            performance and accurate updates.
          </p>
        </div>

        <div className="about-image">
          <img src={weatherImg2} alt="Weather technology" />
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="about-section">
        <div className="about-text">
          <h2>Why Choose This App?</h2>
          <ul className="about-list">
            <li>🌍 Real-time weather updates</li>
            <li>📱 Fully responsive design</li>
            <li>⚡ Fast and lightweight performance</li>
            <li>☁️ Accurate data from trusted APIs</li>
          </ul>
        </div>
      </section>

      

    </div>
  );
};

export default About;
