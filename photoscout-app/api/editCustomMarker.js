import * as FileSystem from 'expo-file-system';

export const editCustomMarker = async () => {
  // const filePath = FileSystem.documentDirectory + 'customLocations.json';
  try {
    console.log('editCustomMarker runs');
    // const { exists } = await FileSystem.getInfoAsync(filePath);
    // if (exists) {
    //   const result = await FileSystem.readAsStringAsync(filePath);
    //   const data = JSON.parse(result);
    //   const markerIndex = data.locations.findIndex(m => m.id === marker.id);
    //   if (markerIndex !== -1) {
    //     data.locations[markerIndex] = marker;
    //     data.updated = new Date().toISOString();
    //     const jsonString = JSON.stringify(data, null,  2);
    //     await FileSystem.writeAsStringAsync(filePath, jsonString);
    //     console.log('Marker edited and file updated successfully');
    //   } else {
    //     console.log('Marker not found');
    //   }
    // } else {
    //   console.log('No custom markers to edit');
    // }
  } catch (error) {
    console.error('Error editing custom marker:', error);
    throw error;
  }
};