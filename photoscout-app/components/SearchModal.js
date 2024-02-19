import React, { useState, useContext } from 'react';
import { Modal, StyleSheet, View, Text, TextInput, Button } from 'react-native';

import { CoordinatesContext } from '../CoordinatesContext';
import { fetchLocation } from '../api/fetchLocation';

const SearchModal = ({ isVisible, onClose, title }) => {
  const { location, setLocation, coordinates, setCoordinates, isSearchActive, setSearchActive } = useContext(CoordinatesContext);
  
  const onSearch = () => {
    console.log('location value for searching: ', location);
    fetchLocation(location)
      .then(data => {
        console.log('Parsed location:');
        console.log(data);

        if (data.length > 0) {
          const firstResult = data[0];
          const latitudeFloat = parseFloat(firstResult.lat);
          const longitudeFloat = parseFloat(firstResult.lon);

          console.log('searchmodal coordinates: ', coordinates);

          setCoordinates({
            latitude: latitudeFloat,
            longitude: longitudeFloat
          });

          console.log('searchmodal setSearchActive value: ', isSearchActive);

          setSearchActive(true);
        } else {
          Alert.alert("No results found for " + address);
          setLoading(false);
        }

      })
      .catch(error => {
        console.error('SearchModal Error fetching location:', error);
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.input}
            onChangeText={setLocation}
            value={location}
            placeholder='Search location here...'
          />
          <Button onPress={onSearch} title="Search" />
        </View>

        <Button onPress={onClose} title="Close" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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