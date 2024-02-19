import React, { useContext, useEffect, useState } from 'react';
import { Modal, StyleSheet, View, Text, FlatList, TouchableOpacity, Button } from 'react-native';

import { CoordinatesContext } from '../contexts/GlobalContext';
import { deleteAllCustomMarkers } from '../api/deleteAllCustomMarkers';
import { CustomLocationsContext } from '../contexts/CustomLocationsContext';

const ListModal = ({ isVisible, onClose, title }) => {
  const { defaultLocations } = useContext(CoordinatesContext);
  const { customLocations, refreshCustomLocations } = useContext(CustomLocationsContext);

  const deleteAllMarkers = async () => {
    console.log('Delete all markers');

    try {
      await deleteAllCustomMarkers();
      console.log('All custom markers deleted successfully');
      refreshCustomLocations();
    } catch (error) {
      console.error('Failed to delete all custom markers:', error);
    }
  }

  useEffect(() => {
    refreshCustomLocations();
  }, [isVisible]);
  
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
          <Text>Locations:</Text>
          
          <FlatList
            data={defaultLocations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text>{item.name}</Text>}
          />

          <FlatList
            data={customLocations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text>{item.name}</Text>}
          />

          <Button onPress={deleteAllMarkers} title="Delete All" />
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
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});

export default ListModal;