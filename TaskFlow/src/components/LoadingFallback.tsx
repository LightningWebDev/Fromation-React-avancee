import React from 'react';
import './LoadingFallback.css';

const LoadingFallback: React.FC = () => {
  return (
    <div className="loading-fallback">
      <div className="loading-content">
        <div className="spinner" />
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingFallback;
