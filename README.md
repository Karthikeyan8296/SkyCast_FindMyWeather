<img width="1886" height="1016" alt="image" src="https://github.com/user-attachments/assets/8d1c15d8-7095-4f8b-b5b0-69a60978df40" />
<img width="1911" height="1012" alt="image" src="https://github.com/user-attachments/assets/3e2c62bd-31b2-4ba2-b4a4-f1be1264971f" />


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


import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const API_KEY = "0d408a7c9dcb8e94da2672f86fc7350c";


function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const city = localStorage.getItem("city");
  const navigate = useNavigate();


  useEffect(() => {
    if (!city) {
      navigate("/");
      return;
    }


    const res = axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
      .then((res) => {
        setWeatherData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
    console.log(res);
  }, [city, navigate]);


  const fahrenheit = useMemo(() => {
    if (!weatherData) return null;
    return (weatherData.main.temp * 9) / 5 + 32;
  }, [weatherData]);


  if (loading) return <p>Loading weather data...</p>;


  if (!weatherData) return <p>Failed to fetch weather data.</p>;


  return (
    <div className="card">
      <h2>Weather in {weatherData.name}</h2>
      <p>
        Temperature: {weatherData.main.temp}°C / {fahrenheit.toFixed(1)}°F
      </p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind: {weatherData.wind.speed} m/s</p>
      <p>Condition: {weatherData.weather[0].description}</p>
    </div>
  );
}


export default Weather;


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


body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #e0f7fa;
  color: #333;
}


.container {
  padding: 2rem;
  max-width: 600px;
  margin: auto;
}


nav {
  margin-bottom: 1.5rem;
}


nav a {
  text-decoration: none;
  margin-right: 1rem;
  color: #0077b6;
  font-weight: bold;
}


.card {
  background: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}


input {
  padding: 0.5rem;
  font-size: 1rem;
  width: 80%;
  margin-bottom: 1rem;
}


button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background: #00b4d8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}


button:hover {
  background: #0077b6;
}


.error {
  color: red;
  margin-top: 0.5rem;
}
