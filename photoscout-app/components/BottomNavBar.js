import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Button } from 'react-native';

import SearchModal from './SearchModal';
import AddMarkerModal from './AddMarkerModal';
import ListModal from './ListModal';

import { CoordinatesContext } from '../contexts/GlobalContext';

const BottomNavBar = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isAddVisible, setAddVisible] = useState(false);
  const [isListVisible, setListVisible] = useState(false);
  const { location } = useContext(CoordinatesContext);


  const locationRef = useRef(location); 
  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  const searchModalOnClose = () => {
    const currentLocation = locationRef.current;
    if(currentLocation !== '') {
      setSearchVisible(false);
      setAddVisible(true);
    } else {
      setSearchVisible(false);
    }
  }

  return (
    <View>
      <View style={{ position: 'absolute', bottom: 50, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Button title="Add" onPress={() => setSearchVisible(true)} />
        <Button title="List" onPress={() => setListVisible(true)} />
      </View>

      <SearchModal 
        isVisible={isSearchVisible} 
        onClose={() => {searchModalOnClose()}} 
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
  );
};

export default BottomNavBar;