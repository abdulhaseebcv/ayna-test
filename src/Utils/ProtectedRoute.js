import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute component to handle authentication
const ProtectedRoute = ({ children }) => {

    // Checking if a token is present in local storage
    const token = localStorage.getItem('token');

    // Render the children components if the user is authenticated, otherwise navigate to the login page
    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
