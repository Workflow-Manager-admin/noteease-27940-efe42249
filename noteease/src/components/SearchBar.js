import React from 'react';

/**
 * SearchBar component for filtering notes by keywords
 * 
 * @param {string} searchTerm - Current search term
 * @param {function} onSearchChange - Handler for search input changes
 */
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
