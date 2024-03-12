import * as FileSystem from 'expo-file-system';

export const deleteCustomMarker = async (marker) => {
  const filePath = FileSystem.documentDirectory + 'customLocations.json';

  try {
    const { exists } = await FileSystem.getInfoAsync(filePath);
    if (exists) {
      const result = await FileSystem.readAsStringAsync(filePath);
      const data = JSON.parse(result);
      console.log('deleteCustomMarker data:', data);

      // Find the index of the marker to delete
      const markerIndex = data.locations.findIndex(location => location.name === marker.name);
      if (markerIndex !== -1) {
        // Remove the marker from the array
        data.locations.splice(markerIndex,  1);
        data.updated = new Date().toISOString();

        // Write the updated array back to the file
        const jsonString = JSON.stringify(data, null,  2);
        await FileSystem.writeAsStringAsync(filePath, jsonString);
        console.log('Marker deleted and file updated successfully');
      } else {
        console.log('Marker not found');
      }
    } else {
      console.log('No custom markers to delete');
    }
  } catch (error) {
    console.error('Error deleting custom marker:', error);
    throw error;
  }
};