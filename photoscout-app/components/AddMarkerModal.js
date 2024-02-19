import React, { useState } from 'react';
import { Modal, StyleSheet, View, Text, Button, TextInput } from 'react-native';

const AddMarkerModal = ({ isVisible, onClose, title }) => {
  const [markerName, setMarkerName] = useState('');

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <TextInput
          style={styles.input}
          onChangeText={setMarkerName}
          value={markerName}
          placeholder='Set marker name here...'
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default AddMarkerModal;