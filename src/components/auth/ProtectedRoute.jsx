import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedUserTypes = [] }) => {
  const { currentUser, userData, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!currentUser || !userData) {
    return <Navigate to="/login" replace />;
  }

  // If specific user types are required and user's type is not allowed
  if (allowedUserTypes.length > 0 && !allowedUserTypes.includes(userData.userType)) {
    // Redirect to appropriate dashboard based on user type
    switch (userData.userType) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'driver':
        return <Navigate to="/driver" replace />;
      case 'passenger':
        return <Navigate to="/passenger" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute; 