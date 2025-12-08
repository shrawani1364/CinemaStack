import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header = ({ activeTab, setActiveTab, watchlistCount }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>🎬 CinemaStack</h1>
          <p className="tagline">Discover & Organize Your Movies</p>
        </div>
        
        <nav className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'browse' ? 'active' : ''}`}
            onClick={() => setActiveTab('browse')}
          >
            Browse Movies
          </button>
          <button
            className={`nav-tab ${activeTab === 'watchlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('watchlist')}
          >
            My Watchlist
            {watchlistCount > 0 && (
              <span className="badge">{watchlistCount}</span>
            )}
          </button>
        </nav>
        
        <div className="header-actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;