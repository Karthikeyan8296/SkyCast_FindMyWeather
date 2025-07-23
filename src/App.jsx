import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Weather from "./pages/Weather";

function App() {
  return (
    <div className="container">
      <nav>
        <Link to="/">Home</Link> | <Link to="/weather">Weather</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </div>
  );
}

export default App;
