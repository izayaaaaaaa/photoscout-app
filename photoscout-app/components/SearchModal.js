import React, { useState, useContext } from 'react';
import { Modal, StyleSheet, View, TextInput, Button, TouchableOpacity, Keyboard } from 'react-native';

import { CoordinatesContext } from '../contexts/GlobalContext';
import { fetchLocation } from '../api/fetchLocation';

const SearchModal = ({ isVisible, onClose, title }) => {
  const { mapRegion, setMapRegion, location, setLocation, setSearchCoordinates, setSearchActive } = useContext(CoordinatesContext);
  const [currentLocation, setCurrentLocation] = useState('');
  
  const onSearch = async () => {
    try {
      const data = await fetchLocation(currentLocation);
      if (data.length >  0) {
        const firstResult = data[0];
        const latitudeFloat = parseFloat(firstResult.lat);
        const longitudeFloat = parseFloat(firstResult.lon);

        setMapRegion({
          ...mapRegion,
          latitude: latitudeFloat,
          longitude: longitudeFloat
        });

        setSearchCoordinates({
          latitude: latitudeFloat,
          longitude: longitudeFloat
        });

        Keyboard.dismiss();
        setLocation(currentLocation);
        setCurrentLocation(''); // clear the search input
        setSearchActive(true); // render the search marker
        onClose();
      } else {
        console.error('No location found');
      }
    } catch (error) {
      console.error('SearchModal Error fetching location:', error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay} >
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.modalView}>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              onChangeText={setCurrentLocation}
              value={currentLocation}
              placeholder='Search location here...'
            />
            <Button onPress={onSearch} title="Search" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex:  1,
    backgroundColor: 'rgba(0,  0,  0, 0)',
  },
  overlayTouchable: {
    position: 'absolute',
    top:  0,
    left:  0,
    right:  0,
    bottom:  0,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default SearchModal;