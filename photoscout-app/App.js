import React, { useState } from 'react';
import { View, Button } from 'react-native';

import { CoordinatesProvider } from './Context';
import MapViewScreen from './components/MapViewScreen'; 
import SearchModal from './components/SearchModal';
import AddMarkerModal from './components/AddMarkerModal';
import ListModal from './components/ListModal';

export default function App() {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isAddVisible, setAddVisible] = useState(false);
  const [isListVisible, setListVisible] = useState(false);

  return (
    <CoordinatesProvider>
      <View style={{ flex: 1 }}>
        <MapViewScreen />

        {/* bottom navbar */}
        <View style={{ position: 'absolute', bottom: 50, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button title="Search" onPress={() => setSearchVisible(true)} />
          <Button title="Add" onPress={() => setAddVisible(true)} />
          <Button title="List" onPress={() => setListVisible(true)} />
        </View>

        <SearchModal 
          isVisible={isSearchVisible} 
          onClose={() => setSearchVisible(false)} 
          title="Search"
        />
        <AddMarkerModal 
          isVisible={isAddVisible} 
          onClose={() => setAddVisible(false)} 
          title="Add"
        />
        <ListModal 
          isVisible={isListVisible} 
          onClose={() => setListVisible(false)} 
          title="List"
        />
      </View>
    </CoordinatesProvider>
  );
}
