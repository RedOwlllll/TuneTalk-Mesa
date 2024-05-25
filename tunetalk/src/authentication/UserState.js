/* File to check and handle user authentication - will be used for Navigation bar file */

import React, { createContext, useContext, useState, useEffect } from 'react';

// Object that represents the initial state of the user.
const initialUser = {
  _id: null, // Initialize _id as null
  email: '',
  username: '',
  password: '',
  spotifyAccount: '',
  bio: '',
  profileImage: '',
  isAuthenticated: false,
};

/* Passing initialUser object as the default value - if user info 
  is not inputted/not found, email, password, spotifyAccount etc. remain empty and authentication is false.
*/
const UserContext = createContext(initialUser);

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState((initialUser) => {
    // Retrieve the user from localStorage if it exists
    const storedUser = localStorage.getItem('user');
    console.log(localStorage.getItem('user'));
    //return initialUser;
    return storedUser ? JSON.parse(storedUser) : initialUser; // KEEP THIS HERE OTHERWISE THE TUNETALK EMAIL AND USERNAME WILL NOT BE SAVED IN THE DROPDOWN MENU AFTER REDIRECTING TO ACCOUNT/SPOTIFY
  });
  // Effect to store user in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  
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