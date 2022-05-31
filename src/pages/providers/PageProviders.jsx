import React, { createContext } from 'react';
import { useController } from './hooks';

export const pageContext = createContext({});

export const PageProvider = ({ children }) => {
  const value = useController();

  return (
    <pageContext.Provider
    value={value}
    >
      {children}
    </pageContext.Provider>
  );
}