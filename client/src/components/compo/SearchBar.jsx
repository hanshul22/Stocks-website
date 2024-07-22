import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // If you use Axios for API requests
import styles from "../styles/SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const searchBarRef = useRef(null);

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    onSearch(value); // Pass the search query to the parent component

    if (value) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/suggestions?q=${query}`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
    onSearch(suggestion); // Update the search query in the parent component
  };

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setSuggestions([]); // Close suggestions when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.searchBar} ref={searchBarRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search stocks..."
      />
      {suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={styles.suggestionItem}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
