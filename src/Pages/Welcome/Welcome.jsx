import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <section className="wlcm">
      <div className="wlcm-content">
        <h1 className="fade-up">Weather Forecast</h1>

        <p className="fade-up delay">
          Get real-time weather updates instantly
        </p>

        <button
          className="fade-up delay2"
          onClick={() => navigate("/home")}
        >
          Let’s Get Started
        </button>
      </div>
    </section>
  );
};

export default Welcome;
