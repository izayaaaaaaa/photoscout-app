import React, { createContext, useState, useEffect } from 'react';
import { fetchCustomLocations } from '../api/fetchCustomLocations';

export const CustomLocationsContext = createContext();

export const CustomLocationsProvider = ({ children }) => {
  const [customLocations, setCustomLocations] = useState([]);

  const refreshCustomLocations = async () => {
    try {
      console.log('Fetching custom locations...');
      const locations = await fetchCustomLocations();
      setCustomLocations(locations);
    } catch (error) {
      console.error('Error refreshing custom locations:', error);
    }
  };

  useEffect(() => {
    refreshCustomLocations();
  }, []);

  return (
    <CustomLocationsContext.Provider value={{ customLocations, refreshCustomLocations }}>
      {children}
    </CustomLocationsContext.Provider>
  );
};