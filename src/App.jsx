import "./App.css";
import LocationForm from "./components/LocationForm";

import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [location, setLocation] = useState({});
  const [search, setSearch] = useState({});
  const [weather, setWeather] = useState([]);

  function handleChange(event) {
    setSearch(event.target.value);
  }

  async function getLocation(event) {
    event.preventDefault();

    const API = `https://eu1.locationiq.com/v1/search?q=${search}&key=${API_KEY}&format=json`;
    const res = await axios.get(API);

    setLocation(res.data[0]);
    getWeather(res.data[0].lat, res.data[0].lon, search);
  }

  async function getWeather(lon, lat, search) {
    const API = `http://localhost:8080/weather?lon=${lon}&lat=${lat}&searchQuery=${search}`;

    const res = await axios.get(API);

    setWeather(res.data);

    //setLocation(res.data[0]);
  }
  return (
    <>
      <h1>Choose Your Location</h1>
      <LocationForm getLocation={getLocation} handleChange={handleChange} />
      <h2>{location.display_name}</h2>
      <h2>
        Latitude: {location.lat}, Longitude: {location.lon}
      </h2>
      <img
        src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&zoom=16`}
        alt="location map"
      />
      <h2>Weather: {weather}</h2>
    </>
  );
}

/*http://localhost:8080/weather?lon=2.3200410217200766
&lat=48.8588897&searchQuery=Paris*/
