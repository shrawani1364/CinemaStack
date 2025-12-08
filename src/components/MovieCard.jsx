import React, { useState } from 'react';

const MovieCard = ({ movie, isInWatchlist, onAddToWatchlist, onRemoveFromWatchlist, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWatchlistToggle = (e) => {
    e.stopPropagation();
    if (isInWatchlist) {
      onRemoveFromWatchlist(movie.id);
    } else {
      onAddToWatchlist(movie.id);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="stars">
        {'★'.repeat(fullStars)}
        {halfStar && '★'}
        {'☆'.repeat(emptyStars)}
        <span className="rating-text">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div 
      className={`movie-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(movie)}
    >
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} loading="lazy" />
        <div className="movie-overlay">
          <button 
            className={`watchlist-btn ${isInWatchlist ? 'in-watchlist' : ''}`}
            onClick={handleWatchlistToggle}
            aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            {isInWatchlist ? '✓ Added' : '+ Watchlist'}
          </button>
        </div>
        <div className="movie-rating-badge">
          {movie.rating.toFixed(1)}
        </div>
      </div>
      
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-year">{movie.year}</span>
          <span className="movie-duration">{movie.duration}</span>
        </div>
        <div className="movie-genres">
          {movie.genres.slice(0, 2).map(genre => (
            <span key={genre} className="genre-tag">{genre}</span>
          ))}
          {movie.genres.length > 2 && (
            <span className="genre-tag">+{movie.genres.length - 2}</span>
          )}
        </div>
        {renderStars(movie.rating)}
        <p className="movie-director">Directed by {movie.director}</p>
      </div>
    </div>
  );
};

export default MovieCard;