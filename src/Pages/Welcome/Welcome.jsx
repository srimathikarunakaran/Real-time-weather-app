import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="wlcm">
      <div className="wlcm-text">
        <h1>Welcome to Weather App!!!</h1>
        <p>
          Looking for weather details? <br />
          Get real-time weather updates for any city
        </p>
      </div>

      <button onClick={() => navigate("/home")}>
        Lets Get Started
      </button>
    </div>
  );
};

export default Welcome;
