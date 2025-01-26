import { useState, useEffect } from "react";
import axios from "axios";
import WeatherComponent from "./Components/WeatherComponent";
import { Box, TextField, Button, CircularProgress, Typography, Alert } from "@mui/material";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        setErrorMessage(""); 
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
        setErrorMessage("Failed to fetch weather data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [debouncedCity]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f8ff"
      fontFamily="Arial, sans-serif"
      p={2}
    >
      <Box mb={4} textAlign="center" display="flex" justifyContent="center" alignItems="center" gap={2}>
        <TextField
          label="Enter City Name"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ width: 250, mr: 2 }}
        />
        <Button
          variant="contained"
          color="success"
          onClick={() => setCity(city)}
          sx={{ textTransform: "none", fontSize: "16px", height: "56px" }}
        >
          Search
        </Button>
      </Box>
      {errorMessage && (
        <Alert severity="warning">{errorMessage}</Alert>
      )}
      {loading ? (
        <CircularProgress color="success" />
      ) : Object.keys(data).length > 0 ? (
        <WeatherComponent data={data} />
      ) : (
        <Typography color="textSecondary">
          Enter a city name to get the weather details.
        </Typography>
      )}
    </Box>
  );
}

export default App;
