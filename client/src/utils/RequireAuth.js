import React from 'react';
import { Navigate } from 'react-router-dom';

import { getCookie } from './Cookies';

const RequireAuth = ({ children, redirectTo }) => {
  // const token = localStorage.getItem('token');
  const token = getCookie('access');

  return token ? children : <Navigate to={redirectTo} replace={true} />;
};

export default RequireAuth;
