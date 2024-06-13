import React, { createContext, useContext, useEffect, useState } from 'react';

const TokenContext = createContext();

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
 
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('Token_User')));

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = JSON.parse(localStorage.getItem('Token_User'));
      setToken(newToken);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  return (
    <TokenContext.Provider value={{token,setToken}}>
      {children}
    </TokenContext.Provider>
  );
};