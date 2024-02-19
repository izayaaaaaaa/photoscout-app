import React, { useState, useEffect, useContext } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

import { CoordinatesContext } from '../Context';
import { fetchDefaultLocations } from '../api/fetchDefaultLocations';
import { fetchCustomLocations } from '../api/fetchCustomLocations';

const MapViewScreen = () => {
  const { defaultLocations, setDefaultLocations, customLocations, setCustomLocations, coordinates, isSearchActive } = useContext(CoordinatesContext);

  useEffect(() => {
    console.log('Fetching markers data...');
    fetchDefaultLocations()
      .then(data => {
        console.log('Parsed markers:', data);
        setDefaultLocations(data.locations);
      })
      .catch(error => {
        console.error('Error fetching markers:', error);
      });

    fetchCustomLocations()
      .then(data => {
        console.log('Parsed custom markers:', data);
        setCustomLocations(data);
      })
      .catch(error => {
        console.error('Error fetching custom markers:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map } 
        initialRegion={{
          latitude: -33.855061436377696,
          latitudeDelta: 0.26054061815599283,
          longitude: 151.2436400167644,
          longitudeDelta: 0.14118041843175888,
        }}
      >
        {defaultLocations && defaultLocations.length > 0 && defaultLocations.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
            title={marker.name}
          />
        ))}

        {customLocations && customLocations.length > 0 && customLocations.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
            title={marker.name}
            pinColor="blue"
          />
        ))}

        {isSearchActive && (
          <Marker
            coordinate={coordinates}
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