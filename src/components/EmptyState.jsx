import React from 'react';

const EmptyState = ({ title, message, icon }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-message">{message}</p>
    </div>
  );
};

export default EmptyState;