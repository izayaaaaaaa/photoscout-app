import React, { useState, useContext } from 'react';
import { Modal, StyleSheet, View, TextInput, Button, TouchableOpacity } from 'react-native';

import { CoordinatesContext } from '../Context';
import { fetchLocation } from '../api/fetchLocation';

const SearchModal = ({ isVisible, onClose, title }) => {
  const { location, setLocation, coordinates, setCoordinates, isSearchActive, setSearchActive } = useContext(CoordinatesContext);
  
  const onSearch = () => {
    fetchLocation(location)
      .then(data => {
        console.log('Parsed location:');
        console.log(data);

        if (data.length > 0) {
          const firstResult = data[0];
          const latitudeFloat = parseFloat(firstResult.lat);
          const longitudeFloat = parseFloat(firstResult.lon);

          setCoordinates({
            latitude: latitudeFloat,
            longitude: longitudeFloat
          });

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
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
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
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
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