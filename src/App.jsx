import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Pages/Welcome/Welcome";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
