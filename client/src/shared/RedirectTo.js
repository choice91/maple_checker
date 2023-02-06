import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RedirectTo = () => {
  const location = useLocation();
  return location.pathname === "/" && <Navigate to="/boss" replace={true} />;
};

export default RedirectTo;
