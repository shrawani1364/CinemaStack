import React, { useEffect } from 'react';

const MovieModal = ({ movie, isOpen, onClose, isInWatchlist, onToggleWatchlist }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="modal-stars">
        {'★'.repeat(fullStars)}
        {halfStar && '★'}
        {'☆'.repeat(emptyStars)}
        <span className="modal-rating-text">{rating.toFixed(1)}/10</span>
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        
        <div className="modal-header">
          <img src={movie.poster} alt={movie.title} className="modal-poster" />
          <div className="modal-header-info">
            <h2 className="modal-title">{movie.title} ({movie.year})</h2>
            <div className="modal-meta">
              <span className="modal-duration">{movie.duration}</span>
              <span className="modal-director">Directed by {movie.director}</span>
            </div>
            <div className="modal-genres">
              {movie.genres.map(genre => (
                <span key={genre} className="modal-genre-tag">{genre}</span>
              ))}
            </div>
            {renderStars(movie.rating)}
            <button 
              className={`modal-watchlist-btn ${isInWatchlist ? 'in-watchlist' : ''}`}
              onClick={() => onToggleWatchlist(movie.id)}
            >
              {isInWatchlist ? '✓ Remove from Watchlist' : '+ Add to Watchlist'}
            </button>
          </div>
        </div>

        <div className="modal-body">
          <h3 className="modal-section-title">Plot Summary</h3>
          <p className="modal-plot">{movie.plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;