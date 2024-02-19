import React from 'react';
import { View } from 'react-native';

import { CoordinatesProvider, CoordinatesContext } from './contexts/GlobalContext';
import { CustomLocationsProvider } from './contexts/CustomLocationsContext';

import MapViewScreen from './components/MapViewScreen';
import BottomNavBar from './components/BottomNavBar';

export default function App() {

  return (
    <CustomLocationsProvider>
    <CoordinatesProvider>
      <View style={{ flex: 1 }}>
        <MapViewScreen />
        <BottomNavBar />
      </View>
    </CoordinatesProvider>
    </CustomLocationsProvider>
  );
}
