import "./App.css";
import LocationForm from "./components/LocationForm";

import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [location, setLocation] = useState({});
  const [search, setSearch] = useState({});

  function handleChange(event) {
    setSearch(event.target.value);
  }

  async function getLocation(event) {
    event.preventDefault();

    const API = `https://eu1.locationiq.com/v1/search?q=${search}&key=${API_KEY}&format=json`;
    const res = await axios.get(API);

    setLocation(res.data[0]);
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
    </>
  );
}

/* function App() {
  // store our games data in state
  cost[(games, setGames)] = useState([]);
  // function to get our data
  async function getGames(event) {
    event.preventDefault();
    console.log(event.target);
    const API = `http://localhost:8080/games?year=${event.target.year.value}`;
    const res = await axios.get(API);
    setGames(res.data);
  }

  return (
    <>
      <form onSubmit={getGames}>
        <input name="year" placeholder="Year" />
        <button>Get Games</button>
      </form>
      {/* have a form with an input that lets us choose a year*/}
      {/* map through our games data to show all of them*/}
      {games.map((game) => {
        return (
          <div key={game.name}>
            <h2>{game.name}</h2>
            <h3>{game.year}</h3>
          </div>
        );
      })}
    </>
  );
}

export default App;*/
