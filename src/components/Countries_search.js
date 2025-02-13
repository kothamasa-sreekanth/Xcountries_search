import React, { useState, useEffect } from "react";
import CountryCard from "../countryCard";
import "../App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) throw new Error("Network response was not ok.");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredCountries = countries.filter(
    (country) =>
      country.name?.common &&
      country.name.common.toLowerCase().includes(searchTerm)
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
        className="searchBar"
      />
      <div className="countryContainer">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <CountryCard
              key={country.cca3}
              name={country.name.common}
              flag={country.flags?.png}
            />
          ))
        ) : (
          <p>No matching countries found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
