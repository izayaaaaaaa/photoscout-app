import React, { useContext, useEffect, useState } from 'react';
import { Modal, StyleSheet, View, Text, FlatList, TouchableOpacity, Button } from 'react-native';

import { CoordinatesContext } from '../Context';
import { deleteAllCustomMarkers } from '../api/deleteAllCustomMarkers';
import { fetchCustomLocations } from '../api/fetchCustomLocations';

const ListModal = ({ isVisible, onClose, title }) => {
  const { defaultLocations, customLocations, setCustomLocations } = useContext(CoordinatesContext);
  const [isDelete, setIsDelete] = useState(false);

  const deleteAllMarkers = async () => {
    console.log('Delete all markers');

    try {
      await deleteAllCustomMarkers();
      console.log('All custom markers deleted successfully');
      setIsDelete(true);
    } catch (error) {
      console.error('Failed to delete all custom markers:', error);
    }
  }

  useEffect(() => {
    fetchCustomLocations()
      .then(data => {
        console.log('Parsed custom markers:', data);
        setCustomLocations(data);
      })
      .catch(error => {
        console.error('Error fetching custom markers:', error);
      });
  }, [isVisible, isDelete]);
  
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