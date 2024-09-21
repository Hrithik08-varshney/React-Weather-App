import React, { useState, useEffect, useRef } from 'react';
import './CustomInput.css';

const cities = [
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Sydney",
  "Berlin",
  "Moscow",
  "Toronto",
  "Los Angeles",
  "Dubai"
  // Add more cities as needed
];

const CustomInput = ({ onCitySelect }) => {
  const [inputValue, setInputValue] = useState(""); // To store the user's input
  const [filteredCities, setFilteredCities] = useState([]); // Filtered list of cities based on input
  const [showDropdown, setShowDropdown] = useState(false); // Toggle dropdown visibility
  const dropdownRef = useRef(null); // Reference for the dropdown for click outside detection

  // Update filtered cities whenever the input value changes
  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = cities.filter((city) =>
        city.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [inputValue]);

  // Close dropdown if clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle city selection
  const handleCityClick = (city) => {
    setInputValue(city); // Update the input field with the selected city
    setShowDropdown(false); // Close the dropdown
    onCitySelect(city); // Pass selected city to parent component (App.js)
  };

  return (
    <div className="custom-input" ref={dropdownRef}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowDropdown(true); // Show dropdown when user types
        }}
        onFocus={() => setShowDropdown(true)} // Show dropdown when input is focused
        placeholder="Search for a city"
      />

      {showDropdown && filteredCities.length > 0 && (
        <div className="dropdown">
          {filteredCities.map((city, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleCityClick(city)}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
