import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const RouteList = () => {
  const location = useLocation();

  return (
    <div>
      <h2>Current Route: {location.pathname}</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/apps">App List</Link></li>
      </ul>
    </div>
  );
};

export default RouteList;