import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles = [], permissions = [] }) => {
  const userRoles = sessionStorage.getItem('roles')?.split(',') || [];
  const userPermissions = sessionStorage.getItem('permissions')?.split(',') || [];

  const hasRequiredRole = roles.some(role => userRoles.includes(role));
  const hasRequiredPermission = permissions.some(permission => userPermissions.includes(permission));

  return hasRequiredRole || hasRequiredPermission ? children : <Navigate to="/not-found" />;
};

export default PrivateRoute;
