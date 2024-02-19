import React, { useState, useContext } from 'react';
import { Modal, StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';

import { CoordinatesContext } from '../contexts/GlobalContext';
import { addNewMarker } from '../api/addNewMarker';
import { CustomLocationsContext } from '../contexts/CustomLocationsContext';


const AddMarkerModal = ({ isVisible, onClose, title }) => {
  const { searchCoordinates, setSearchCoordinates, location } = useContext(CoordinatesContext);
  const { refreshCustomLocations } = useContext(CustomLocationsContext);
  const [markerName, setMarkerName] = useState('');
  
  const AddMarker = async () => {
    try {
      const newMarker = {
        name: markerName,
        lat: searchCoordinates.latitude,
        lng: searchCoordinates.longitude,
      };

      console.log('New marker:', newMarker);

      await addNewMarker(newMarker);
      setSearchCoordinates({ latitude: 0, longitude: 0 })
      refreshCustomLocations();
    } catch (error) {
      console.error('Error adding new marker:', error);
    }  
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
          <Text>Current Location: {location}</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              onChangeText={setMarkerName}
              value={markerName}
              placeholder='Set marker name here...'
            />
            <Button onPress={AddMarker} title="Add Marker" />
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

export default AddMarkerModal;