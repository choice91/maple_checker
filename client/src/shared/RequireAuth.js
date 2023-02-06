import React from "react";
import { Navigate } from "react-router-dom";

import { getLocalStorage } from "./LocalStorage";

const RequireAuth = ({ children, redirectTo }) => {
  const token = getLocalStorage("token");

  return token ? children : <Navigate to={redirectTo} replace={true} />;
};

export default RequireAuth;
