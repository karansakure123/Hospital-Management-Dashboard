import React, { useState, useEffect } from 'react';
import './dashboard.css'; // Ensure this is the correct path to your CSS file

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate 2 seconds of loading
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="advanced-spinner">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return <Sidebar />;
};

export default Dashboard;
