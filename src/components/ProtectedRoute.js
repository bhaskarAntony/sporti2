// RequireAuth.js
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const isAuthenticated = useAuth(); // Replace false with your authentication logic
    const location = useLocation();
    const { setLocation } = useAuth();

    if (!isAuthenticated) {
        setLocation(location); // Set the current location in the auth context
    }
    return (
        <React.Fragment>
            {isAuthenticated ? (
                <Outlet />
            ) : (
                <Navigate to="/login" />
            )}
        </React.Fragment>
    );
};

export default ProtectedRoute;
