import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./UserState";

export const ProtectedRoute = ({ children }) => {
  const [user] = useUser(); // Destructuring user from useUser hook
  // If user is not authenticated, redirect to menu page
  if (!user.isAuthenticated) {
    
    return <Navigate to="/menu" />; // Immediately navigates to menu page
  }

  // If user is authenticated, render the children components
  return children;
};
