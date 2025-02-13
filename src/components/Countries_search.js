import React, { useEffect, useState } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://xcountries-backend.azurewebsites.net/all"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Filter countries based on search input
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="container">
      {/* Search Input */}
      <input
        className="searchBar"
        type="text"
        placeholder="Search for a country"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Flags Grid */}
      <div className="flags-grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <div key={index} className="flag-card">
              <img
                src={country.flag}
                alt={`Flag of ${country.name}`}
                className="flag-image"
              />
              <p className="country-name">{country.name}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No matching countries found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
