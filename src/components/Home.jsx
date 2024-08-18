import React from 'react';
import './style.css';

const Home = () => {
  return (
    <div className="welcome-section">
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to the Admin Panel</h1>
        <p className="welcome-subtitle">Your Gateway to Management</p>
        <p className="welcome-description">
          Streamline your tasks with our intuitive interface. Let’s embark on a journey to efficiency!
        </p>
        <button className="welcome-button">Get Started</button>
      </div>
      <div className="background-shapes">
        <div className="shape circle"></div>
        <div className="shape square"></div>
        <div className="shape triangle"></div>
      </div>
    </div>
  );
};

export default Home;
