import React, { useContext, useEffect, useState } from 'react';
import { Modal, StyleSheet, View, Text, FlatList, TouchableOpacity, Button } from 'react-native';

import { CoordinatesContext } from '../contexts/GlobalContext';
import { deleteAllCustomMarkers } from '../api/deleteAllCustomMarkers';
import { CustomLocationsContext } from '../contexts/CustomLocationsContext';

const DetailsModal = ({ item, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <Text>Name: {item.name}</Text>
        <Text>Coordinates:</Text>
        <Text>Latitude: {item.lat}</Text>
        <Text>Longitude: {item.lng}</Text>
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

const ListModal = ({ isVisible, onClose, title }) => {
  const { defaultLocations } = useContext(CoordinatesContext);
  const { customLocations, refreshCustomLocations } = useContext(CustomLocationsContext);

  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const deleteAllMarkers = async () => {
    try {
      await deleteAllCustomMarkers();
      refreshCustomLocations();
    } catch (error) {
      console.error('Failed to delete all custom markers:', error);
    }
  }

  useEffect(() => {
    refreshCustomLocations();
  }, [isVisible]);

  const handleItemPress = (item) => {
    console.log('Item pressed: ', item);
    setSelectedItem(item);
    setIsDetailsModalVisible(true);
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
          <Text style={styles.listTitle}>Locations:</Text>
          <FlatList
            data={defaultLocations}
            keyExtractor={(item, index) => index.toString()}
            // renderItem={({ item }) => <Text>{item.name}</Text>}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleItemPress(item)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
  
          {customLocations && customLocations.length > 0 && (
            <>
              <View style={styles.separator} />
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.listTitle}>Custom Locations:</Text>
                <Button onPress={deleteAllMarkers} title="Delete All" />
              </View>
              
              <FlatList
                data={customLocations}
                keyExtractor={(item, index) => index.toString()}
                // renderItem={({ item }) => <Text>{item.name}</Text>}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleItemPress(item)}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </>
          )}
        </View>
      </View>

      {isDetailsModalVisible && selectedItem && (
        <DetailsModal
          item={selectedItem}
          onClose={() => setIsDetailsModalVisible(false)}
        />
      )}
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
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    height:  1,
    backgroundColor: '#CED0CE', // You can choose any color you like
    marginVertical:  10, // Adjust the margin as needed
  },
  
});

export default ListModal;