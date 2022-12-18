import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, redirectTo }) => {
  const token = localStorage.getItem('user');

  return token ? children : <Navigate to={redirectTo} replace={true} />;
};

export default RequireAuth;
