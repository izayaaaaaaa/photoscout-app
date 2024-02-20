import { Modal, View, Text, Button, StyleSheet } from "react-native";

const DetailsModal = ({ isVisible, item, onClose }) => {
  console.log('DetailsModal item: ', item);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
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

const styles = StyleSheet.create({
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