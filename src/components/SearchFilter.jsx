import React from 'react';
import { allGenres } from '../data/movies';

const SearchFilter = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedGenres, 
  setSelectedGenres, 
  yearRange, 
  setYearRange,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder
}) => {
  const minYear = Math.min(...allGenres.map(() => 1990));
  const maxYear = Math.max(...allGenres.map(() => 2024));

  const handleGenreToggle = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenres([]);
    setYearRange([minYear, maxYear]);
    setSortBy('rating');
    setSortOrder('desc');
  };

  return (
    <div className="search-filter">
      <div className="search-section">
        <div className="search-input-group">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search movies by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button 
              className="clear-search" 
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <h3 className="filter-title">Genres</h3>
          <div className="genre-chips">
            {allGenres.map(genre => (
              <button
                key={genre}
                className={`genre-chip ${selectedGenres.includes(genre) ? 'active' : ''}`}
                onClick={() => handleGenreToggle(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h3 className="filter-title">Year Range: {yearRange[0]} - {yearRange[1]}</h3>
          <div className="range-slider">
            <input
              type="range"
              min={minYear}
              max={maxYear}
              value={yearRange[0]}
              onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
              className="range-input"
            />
            <input
              type="range"
              min={minYear}
              max={maxYear}
              value={yearRange[1]}
              onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
              className="range-input"
            />
          </div>
          <div className="range-labels">
            <span>{minYear}</span>
            <span>{maxYear}</span>
          </div>
        </div>

        <div className="filter-group">
          <h3 className="filter-title">Sort By</h3>
          <div className="sort-controls">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="rating">Rating</option>
              <option value="year">Year</option>
              <option value="title">Title</option>
              <option value="duration">Duration</option>
            </select>
            <button
              className="sort-order-btn"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        <button className="clear-filters-btn" onClick={clearFilters}>
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;