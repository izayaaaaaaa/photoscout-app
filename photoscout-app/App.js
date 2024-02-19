import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function App() {
  const [defaultLocations, setDefaultLocations] = useState([]);

  useEffect(() => {
    console.log('Fetching markers data...'); // Debugging log
    fetch('https://pastebin.com/raw/fkAyNYGF')
      .then(response => {
        console.log('Response received:', response); // Debugging log
        return response.json();
      })
      .then(data => {
        console.log('Parsed data:', data); // Debugging log
        setDefaultLocations(data.locations);
      })
      .catch(error => {
        console.error('Error fetching data:', error); // Debugging log
      });
  }, []);

  const logCurrentLocation = (current) => {
    // console.log('Current location:', current);
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
        onRegionChange={logCurrentLocation}
        initialRegion={{
          latitude: -33.855061436377696, 
          latitudeDelta: 0.26054061815599283, 
          longitude: 151.2436400167644, 
          longitudeDelta: 0.14118041843175888,
        }}
      >
        {/* render markers from the fetched JSON data  */}
        {defaultLocations.length > 0 && defaultLocations.map((marker, index) => (
          <Marker 
            key={index}
            coordinate={{latitude: marker.lat, longitude: marker.lng}}
            title={marker.name}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});