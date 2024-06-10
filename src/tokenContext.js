import React, { createContext, useContext, useState } from 'react';

const TokenContext = createContext();

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('Token_User')));

  

  return (
    <TokenContext.Provider value={{token}}>
      {children}
    </TokenContext.Provider>
  );
};