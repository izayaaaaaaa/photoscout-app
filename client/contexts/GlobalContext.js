import React, { createContext, useState } from 'react';

export const CoordinatesContext = createContext({
  defaultLocations: [],
  setDefaultLocations: () => {},
  location: '',
  setLocation: () => {},
  searchCoordinates: { latitude:  0, longitude:  0 },
  setSearchCoordinates: () => {},
  isSearchActive: false,
  setSearchActive: () => {}, 
  mapRegion: { 
    latitude: -33.855061436377696,
    latitudeDelta: 0.26054061815599283,
    longitude: 151.2436400167644,
    longitudeDelta: 0.14118041843175888,
  },
  setMapRegion: () => {},
  currentMarker: {},
  setCurrentMarker: () => {},
});

export const CoordinatesProvider = ({ children }) => {
  const [defaultLocations, setDefaultLocations] = useState([]);
  const [location, setLocation] = useState('');
  const [searchCoordinates, setSearchCoordinates] = useState({ latitude:  0, longitude:  0 });
  const [isSearchActive, setSearchActive] = useState(false);
  const [mapRegion, setMapRegion] = useState({ 
    latitude: -33.855061436377696,
    latitudeDelta: 0.26054061815599283,
    longitude: 151.2436400167644,
    longitudeDelta: 0.14118041843175888,
  });
  const [currentMarker, setCurrentMarker] = useState({});

  return (
    <CoordinatesContext.Provider value={{ defaultLocations, setDefaultLocations, location, setLocation, searchCoordinates, setSearchCoordinates, isSearchActive, setSearchActive, mapRegion, setMapRegion, currentMarker, setCurrentMarker }}>
      {children}
    </CoordinatesContext.Provider>
  );
};