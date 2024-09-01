import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search'; 

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    onSearch(searchTerm);
  }

  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search products..."
        className="p-2 border border-gray-300 rounded-l-lg flex-grow"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-r-lg flex-shrink-0"
      >
        <SearchIcon />
      </button>
    </form>
  );
}
