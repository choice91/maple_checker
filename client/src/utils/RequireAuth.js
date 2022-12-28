import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, redirectTo }) => {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to={redirectTo} replace={true} />;
};

export default RequireAuth;
