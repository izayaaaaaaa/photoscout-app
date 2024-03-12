import React, { useEffect, useState } from "react";
import { TouchableOpacity, Modal, View, Text, Button, StyleSheet, TextInput } from "react-native";
import { editCustomMarker } from "../api/editCustomMarker";
import { deleteCustomMarker } from "../api/deleteCustomMarker";

const DetailsModal = ({ isVisible, item, onClose }) => {
  const [markerNotes, setMarkerNotes] = useState();
  

  useEffect(() => {
    setMarkerNotes(item.notes);
  }, [isVisible]);

  const onEdit = async () => {
    try {
      const updatedItem = { ...item, notes: markerNotes };
      await editCustomMarker(updatedItem);
      onClose();
    } catch (error) {
      console.error('Failed to edit custom marker:', error);
    }
  }

  const onDelete = async () => {
    try {
      const deletedItem = { ...item };
      await deleteCustomMarker(deletedItem);
      onClose();
    } catch (error) {
      console.error('Failed to delete custom marker:', error);
    }
  }

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
          <Text>Name: {item.name}</Text>
          <Text>Coordinates:</Text>
          <Text>Latitude: {item.lat}</Text>
          <Text>Longitude: {item.lng}</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setMarkerNotes(text)}
            value={markerNotes}
          />
          <View style={{ flexDirection: 'row' }}>
            <Button title="Edit" onPress={onEdit} />
            <Button title="Delete" onPress={onDelete} />
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default DetailsModal;