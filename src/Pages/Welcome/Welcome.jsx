import { useNavigate } from "react-router-dom";
import weatherIcon from "../../Images/snow.png"; // your icon
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <section className="wlcm">
      {/* LEFT TEXT */}
      <div className="wlcm-content">
        <h1>Weather Forecast</h1>
        <p>Get real-time weather updates instantly</p>

        <button onClick={() => navigate("/home")}>
          Let’s Get Started
        </button>
      </div>

      {/* RIGHT ICON */}
      <div className="wlcm-icon">
        <img src={weatherIcon} alt="weather icon" />
      </div>
    </section>
  );
};

export default Welcome;
