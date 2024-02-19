import React, { useState, useContext, useEffect } from 'react';
import { Modal, StyleSheet, View, Text, Button, FlatList } from 'react-native';

import { CoordinatesContext } from '../CoordinatesContext';

const ListModal = ({ isVisible, onClose, title }) => {
  const { defaultLocations, customLocations } = useContext(CoordinatesContext);


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
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
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ListModal;