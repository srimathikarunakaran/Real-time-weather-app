import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Pages/Welcome/Welcome";
import Home from "./Pages/Home/Home";
import "./App.css"; // Import the CSS file here!

function App() {
  return (
    <BrowserRouter>
      {/* Wrap everything in a main container */}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;