import { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState(""); // City entered by user
  const [data, setData] = useState(null); // Weather data
  const [loading, setLoading] = useState(false); // Loading state

  const API_KEY = "05f2685c9b3541daa36102740252601"; // Your API key

  const handleSearch = async () => {
    if (!city.trim()) {
      alert("Please enter a city name.");
      return;
    }

    try {
      setLoading(true); // Show loading while fetching
      setData(null); // Clear previous data

      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
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
      alert("Failed to fetch weather data. Please check the city name and try again.");
    } finally {
      setLoading(false); // Hide loading after fetching
    }
  };

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
          onClick={handleSearch}
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

      {loading && <p>Loading data…</p>}

      {data && (
        <div className="weather-cards" style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <div className="weather-card" style={cardStyle}>
            <h4>Temperature</h4>
            <p>{data.temperature}</p>
          </div>
          <div className="weather-card" style={cardStyle}>
            <h4>Humidity</h4>
            <p>{data.humidity}</p>
          </div>
          <div className="weather-card" style={cardStyle}>
            <h4>Condition</h4>
            <p>{data.condition}</p>
          </div>
          <div className="weather-card" style={cardStyle}>
            <h4>Wind Speed</h4>
            <p>{data.windSpeed}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "10px",
  width: "150px",
  textAlign: "center",
  backgroundColor: "#fff",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
};

export default App;
