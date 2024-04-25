/* File to check and handle user authentication - will be used for Navigation bar file */

import React, { createContext, useContext, useState } from 'react';

// Object that represents the initial state of the user.
const initialUser = {
  email: '',
  username: '',
  spotifyAccount: '',
  password: '',
  isAuthenticated: false,
};

/* Passing initialUser object as the default value - if user info 
  is not inputted/not found, email, password, spotifyAccount etc. remain empty and authentication is false.
*/
const UserContext = createContext(initialUser);

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser); // State variable to handle state of the initial user.

  // Wrap children components with the user context provider
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook function to access user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Reducer function to handle state updates
export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SPOTIFY_USERNAME":
      return {
        ...state,
        user: action.user,
      };
    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };
    // Handle other action types as needed
    default:
      return state;
  }
};