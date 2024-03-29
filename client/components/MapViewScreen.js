import React, { useEffect, useContext } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

import { CoordinatesContext } from '../contexts/GlobalContext';
import { CustomLocationsContext } from '../contexts/CustomLocationsContext';
import { fetchDefaultLocations } from '../api/fetchDefaultLocations';

const MapViewScreen = () => {
  const { mapRegion, defaultLocations, setDefaultLocations, searchCoordinates, isSearchActive } = useContext(CoordinatesContext);
  const { customLocations, refreshCustomLocations } = useContext(CustomLocationsContext);

  useEffect(() => {
    console.log('Fetching markers data...');
    fetchDefaultLocations()
      .then(data => {
        console.log('Default markers:', data);
        setDefaultLocations(data.locations);
      })
      .catch(error => {
        console.error('Error fetching markers:', error);
      });

    refreshCustomLocations();
  }, []);

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        region={mapRegion}
      >

        {defaultLocations && defaultLocations.length > 0 && defaultLocations.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
            title={marker.name}
          />
        ))}

        {customLocations && customLocations.length > 0 && (customLocations.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
            title={marker.name}
            pinColor="blue"
          />
        )))}

        {isSearchActive && (
          <Marker
            coordinate={searchCoordinates}
            title="Searched location"
            pinColor="green"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapViewScreen;