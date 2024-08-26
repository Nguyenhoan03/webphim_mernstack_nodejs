import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles }) => {
  const userRoles = JSON.parse(sessionStorage.getItem('roles') || '[]');

  const hasRequiredRole = roles.some(role => userRoles.includes(role));

  return hasRequiredRole ? children : <Navigate to="/not-found" />;
};

export default PrivateRoute;
