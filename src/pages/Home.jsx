import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/App.css";

function Home() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!city.trim()) {
        setError("City name cannot be empty");
        return;
      }
      localStorage.setItem("city", city.trim());
      navigate("/weather");
    },
    [city, navigate]
  );

  return (
    <div className="card">
      <h2>SkyCast</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setError("");
          }}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Home;
