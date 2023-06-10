import React, { useState } from 'react';
import './SearchEngine.scss';

const SearchEngine = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-engine">
      <form className="search-engine__form">
        <input
          type="text"
          className="search-engine__input"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button type="submit" className="search-engine__button" disabled>
          <i className="search-engine__icon fas fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchEngine;
