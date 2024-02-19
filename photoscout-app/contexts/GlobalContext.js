import React, { createContext, useState } from 'react';

export const CoordinatesContext = createContext({
  defaultLocations: [],
  setDefaultLocations: () => {},
  location: '',
  setLocation: () => {},
  coordinates: { latitude:  0, longitude:  0 },
  setCoordinates: () => {},
  isSearchActive: false,
  setSearchActive: () => {},
});

export const CoordinatesProvider = ({ children }) => {
  const [defaultLocations, setDefaultLocations] = useState([]);
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ latitude:  0, longitude:  0 });
  const [isSearchActive, setSearchActive] = useState(false);

  return (
    <CoordinatesContext.Provider value={{ defaultLocations, setDefaultLocations, location, setLocation, coordinates, setCoordinates, isSearchActive, setSearchActive }}>
      {children}
    </CoordinatesContext.Provider>
  );
};