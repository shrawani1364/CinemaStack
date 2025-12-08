import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { movies, allGenres } from './data/movies';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import MovieGrid from './components/MovieGrid';
import Watchlist from './components/Watchlist';
import MovieModal from './components/MovieModal';
import './styles/App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('cinemastack-watchlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [yearRange, setYearRange] = useState([1990, 2024]);
  const [sortBy, setSortBy] = useState('rating');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showNotification, setShowNotification] = useState('');

  useEffect(() => {
    localStorage.setItem('cinemastack-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const filteredMovies = useMemo(() => {
    return movies
      .filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre = selectedGenres.length === 0 || 
          selectedGenres.some(genre => movie.genres.includes(genre));
        const matchesYear = movie.year >= yearRange[0] && movie.year <= yearRange[1];
        
        return matchesSearch && matchesGenre && matchesYear;
      })
      .sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'rating') {
          comparison = a.rating - b.rating;
        } else if (sortBy === 'year') {
          comparison = a.year - b.year;
        } else if (sortBy === 'title') {
          comparison = a.title.localeCompare(b.title);
        } else if (sortBy === 'duration') {
          const durationA = parseInt(a.duration);
          const durationB = parseInt(b.duration);
          comparison = (durationA || 0) - (durationB || 0);
        }
        
        return sortOrder === 'desc' ? -comparison : comparison;
      });
  }, [searchQuery, selectedGenres, yearRange, sortBy, sortOrder]);

  const handleAddToWatchlist = (movieId) => {
    if (!watchlist.includes(movieId)) {
      setWatchlist([...watchlist, movieId]);
      showNotificationMessage('Added to watchlist!');
    }
  };

  const handleRemoveFromWatchlist = (movieId) => {
    setWatchlist(watchlist.filter(id => id !== movieId));
    showNotificationMessage('Removed from watchlist!');
  };

  const handleClearWatchlist = () => {
    if (window.confirm('Are you sure you want to clear your entire watchlist?')) {
      setWatchlist([]);
      showNotificationMessage('Watchlist cleared!');
    }
  };

  const showNotificationMessage = (message) => {
    setShowNotification(message);
    setTimeout(() => setShowNotification(''), 3000);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleToggleWatchlist = (movieId) => {
    if (watchlist.includes(movieId)) {
      handleRemoveFromWatchlist(movieId);
    } else {
      handleAddToWatchlist(movieId);
    }
  };

  return (
    <ThemeProvider>
      <div className="app">
        <Header 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          watchlistCount={watchlist.length}
        />

        {showNotification && (
          <div className="notification">
            {showNotification}
          </div>
        )}

        <main className="main-content">
          {activeTab === 'browse' ? (
            <>
              <SearchFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                yearRange={yearRange}
                setYearRange={setYearRange}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
              <MovieGrid
                movies={filteredMovies}
                watchlist={watchlist}
                onAddToWatchlist={handleAddToWatchlist}
                onRemoveFromWatchlist={handleRemoveFromWatchlist}
                onMovieClick={handleMovieClick}
              />
            </>
          ) : (
            <Watchlist
              movies={movies}
              watchlist={watchlist}
              onRemoveFromWatchlist={handleRemoveFromWatchlist}
              onMovieClick={handleMovieClick}
              onClearWatchlist={handleClearWatchlist}
            />
          )}
        </main>

        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            isOpen={!!selectedMovie}
            onClose={() => setSelectedMovie(null)}
            isInWatchlist={watchlist.includes(selectedMovie.id)}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        <footer className="footer">
          <p>CinemaStack © 2024 - Movie Discovery & Watchlist Manager</p>
          <p className="footer-stats">
            {movies.length} movies in database • {watchlist.length} in your watchlist
          </p>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default App;