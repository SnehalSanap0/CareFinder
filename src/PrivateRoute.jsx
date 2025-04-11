// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from "./AuthContext" 

// const PrivateRoute = ({ children }) => {
//   const { user } = useContext(AuthContext);

//   // If user is not authenticated, redirect to login page
//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   // If user is authenticated, render the child components
//   return children;
// };

// export default PrivateRoute;
// src/components/ProtectedRoute.js
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = localStorage.getItem("token"); // or check context, etc.

//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;
// src/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // or your loader
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;