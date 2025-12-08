import React from 'react';
import MovieCard from './MovieCard';
import EmptyState from './EmptyState';

const MovieGrid = ({ 
  movies, 
  watchlist, 
  onAddToWatchlist, 
  onRemoveFromWatchlist,
  onMovieClick 
}) => {
  if (movies.length === 0) {
    return (
      <EmptyState
        title="No Movies Found"
        message="Try adjusting your search or filters to find more movies."
        icon="🎬"
      />
    );
  }

  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isInWatchlist={watchlist.includes(movie.id)}
          onAddToWatchlist={onAddToWatchlist}
          onRemoveFromWatchlist={onRemoveFromWatchlist}
          onClick={onMovieClick}
        />
      ))}
    </div>
  );
};

export default MovieGrid;