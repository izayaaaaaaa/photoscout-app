import React, { createContext, useState } from 'react';

export const CoordinatesContext = createContext({
  defaultLocations: [],
  setDefaultLocations: () => {},
  location: '',
  setLocation: () => {},
  searchCoordinates: { latitude:  0, longitude:  0 },
  setSearchCoordinates: () => {},
  isSearchActive: false,
  setSearchActive: () => {}
});

export const CoordinatesProvider = ({ children }) => {
  const [defaultLocations, setDefaultLocations] = useState([]);
  const [location, setLocation] = useState('');
  const [searchCoordinates, setSearchCoordinates] = useState({ latitude:  0, longitude:  0 });
  const [isSearchActive, setSearchActive] = useState(false);

  return (
    <CoordinatesContext.Provider value={{ defaultLocations, setDefaultLocations, location, setLocation, searchCoordinates, setSearchCoordinates, isSearchActive, setSearchActive }}>
      {children}
    </CoordinatesContext.Provider>
  );
};