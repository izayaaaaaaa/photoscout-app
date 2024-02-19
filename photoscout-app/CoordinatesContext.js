import React, { createContext, useState } from 'react';

export const CoordinatesContext = createContext({
  coordinates: { latitude:  0, longitude:  0 },
  setCoordinates: () => {},
  isSearchActive: false,
  setSearchActive: () => {},
});

export const CoordinatesProvider = ({ children }) => {
  const [coordinates, setCoordinates] = useState({ latitude:  0, longitude:  0 });
  const [isSearchActive, setSearchActive] = useState(false);

  return (
    <CoordinatesContext.Provider value={{ coordinates, setCoordinates, isSearchActive, setSearchActive }}>
      {children}
    </CoordinatesContext.Provider>
  );
};