import { TouchableOpacity, Modal, View, Text, Button, StyleSheet } from "react-native";
import { editCustomMarker } from "../api/editCustomMarker";
import { deleteCustomMarker } from "../api/deleteCustomMarker";

const DetailsModal = ({ isVisible, item, onClose }) => {
  console.log('DetailsModal item: ', item);

  const onEdit = async () => {
    try {
      await editCustomMarker();
    } catch (error) {
      console.error('Failed to edit custom marker:', error);
    }
  }

  const onDelete = async () => {
    try {
      await deleteCustomMarker();
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
});

export default DetailsModal;