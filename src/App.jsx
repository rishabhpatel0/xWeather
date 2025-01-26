import { useState, useEffect } from "react";
import axios from "axios";
import WeatherComponent from "./Components/WeatherComponent";

function App() {
  const [city, setCity] = useState(""); 
  const [data, setData] = useState({}); 
  const [loading, setLoading] = useState(false); 

  const API_KEY = "05f2685c9b3541daa36102740252601"; 
  const [debouncedCity, setDebouncedCity] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCity(city); 
    }, 1000); 

    return () => clearTimeout(timer); 
  }, [city]);

 
  useEffect(() => {
    if (!debouncedCity.trim()) return; 

    const fetchWeather = async () => {
      try {
        setLoading(true); 
        const res = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${debouncedCity}&aqi=no`
        );
        const { temp_c, humidity, condition, wind_kph, feelslike_c } = res.data.current;
        setData({
          temperature: `${temp_c}°C`,
          humidity: `${humidity}%`,
          condition: condition.text,
          windSpeed: `${wind_kph} kph`,
          feelsLike: `${feelslike_c}°C`,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data");
      } finally {
        setLoading(false); 
      }
    };

    fetchWeather(); 
  }, [debouncedCity]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f8ff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "10px",
            width: "200px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginRight: "10px",
            fontSize: "16px",
          }}
        />
        <button
          onClick={() => setCity(city)} 
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Search
        </button>
      </div>
      {loading ? (
        <p style={{ color: "#555" }}>Loading data...</p>
      ) : Object.keys(data).length > 0 ? (
        <WeatherComponent data={data} />
      ) : (
        <p style={{ color: "#555" }}>Enter a city name to get the weather details.</p>
      )}
    </div>
  );
}

export default App;
