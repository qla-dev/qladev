import React, { createContext, useContext } from 'react';

const ScrollRootContext = createContext<React.RefObject<HTMLDivElement | null> | null>(null);

interface ScrollRootProviderProps {
  children: React.ReactNode;
  value: React.RefObject<HTMLDivElement | null>;
}

export const ScrollRootProvider: React.FC<ScrollRootProviderProps> = ({ children, value }) => (
  <ScrollRootContext.Provider value={value}>{children}</ScrollRootContext.Provider>
);

export const useScrollRoot = () => useContext(ScrollRootContext);
