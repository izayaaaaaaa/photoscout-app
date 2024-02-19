import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import MapViewScreen from './components/MapViewScreen'; 
import ModalComponent from './components/ModalComponent';
import AddMarkerModal from './components/AddMarkerModal';

export default function App() {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isAddVisible, setAddVisible] = useState(false);
  const [isListVisible, setListVisible] = useState(false);
  const [isSettingsVisible, setSettingsVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <MapViewScreen />

      {/* bottom navbar */}
      <View style={{ position: 'absolute', bottom: 50, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Button title="Search" onPress={() => setSearchVisible(true)} />
        <Button title="Add" onPress={() => setAddVisible(true)} />
        <Button title="List" onPress={() => setListVisible(true)} />
        <Button title="Settings" onPress={() => setSettingsVisible(true)} />
      </View>

      <ModalComponent 
        isVisible={isSearchVisible} 
        onClose={() => setSearchVisible(false)} 
        title="Search"
      >
        <Text>Search location function</Text>
      </ModalComponent>
      <AddMarkerModal 
        isVisible={isAddVisible} 
        onClose={() => setAddVisible(false)} 
        title="Add"
      />
      <ModalComponent 
        isVisible={isListVisible} 
        onClose={() => setListVisible(false)} 
        title="List"
      >
        <Text>List all location markers function</Text>
      </ModalComponent>
      <ModalComponent 
        isVisible={isSettingsVisible} 
        onClose={() => setSettingsVisible(false)} 
        title="Settings"
      >
        <Text>Settings function</Text>
      </ModalComponent>
    </View>
  );
}
