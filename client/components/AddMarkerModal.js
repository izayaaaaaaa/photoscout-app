import React, { useState, useContext } from 'react';
import { Modal, StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';

import { CoordinatesContext } from '../contexts/GlobalContext';
import { addNewMarker } from '../api/addNewMarker';
import { CustomLocationsContext } from '../contexts/CustomLocationsContext';


const AddMarkerModal = ({ isVisible, onClose, title }) => {
  const { searchCoordinates, setSearchCoordinates, location } = useContext(CoordinatesContext);
  const { refreshCustomLocations } = useContext(CustomLocationsContext);
  const [markerNotes, setMarkerNotes] = useState('');
  
  const AddMarker = async () => {
    try {
      const newMarker = {
        name: location,
        notes: markerNotes,
        lat: searchCoordinates.latitude,
        lng: searchCoordinates.longitude,
      };

      await addNewMarker(newMarker);
      setSearchCoordinates({ latitude: 0, longitude: 0 })
      refreshCustomLocations();
      onClose();
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
      <View style={styles.overlay} >
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.modalView}>
          <Text>Current Location: {location}</Text>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={setMarkerNotes}
                value={markerNotes}
                placeholder='Set marker notes here...'
              />
            </View>
            <Button onPress={AddMarker} title="Add Marker" />
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

export default AddMarkerModal;