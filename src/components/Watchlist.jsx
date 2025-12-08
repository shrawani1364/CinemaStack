import React from 'react';
import MovieCard from './MovieCard';
import EmptyState from './EmptyState';

const Watchlist = ({ 
  movies, 
  watchlist, 
  onRemoveFromWatchlist,
  onMovieClick,
  onClearWatchlist 
}) => {
  const watchlistMovies = movies.filter(movie => watchlist.includes(movie.id));

  if (watchlistMovies.length === 0) {
    return (
      <EmptyState
        title="Your Watchlist is Empty"
        message="Add movies you want to watch later by clicking the '+ Watchlist' button."
        icon="📝"
      />
    );
  }

  const stats = {
    totalMovies: watchlistMovies.length,
    averageRating: (watchlistMovies.reduce((sum, movie) => sum + movie.rating, 0) / watchlistMovies.length).toFixed(1),
    totalRuntime: watchlistMovies.reduce((sum, movie) => {
      const hours = parseInt(movie.duration);
      return sum + (hours || 0);
    }, 0)
  };

  return (
    <div className="watchlist-container">
      <div className="watchlist-header">
        <div className="watchlist-stats">
          <div className="stat">
            <span className="stat-value">{stats.totalMovies}</span>
            <span className="stat-label">Movies</span>
          </div>
          <div className="stat">
            <span className="stat-value">{stats.averageRating}</span>
            <span className="stat-label">Avg Rating</span>
          </div>
          <div className="stat">
            <span className="stat-value">{stats.totalRuntime}+</span>
            <span className="stat-label">Hours</span>
          </div>
        </div>
        <button 
          className="clear-watchlist-btn"
          onClick={onClearWatchlist}
        >
          Clear All
        </button>
      </div>

      <div className="movie-grid">
        {watchlistMovies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isInWatchlist={true}
            onRemoveFromWatchlist={onRemoveFromWatchlist}
            onClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;