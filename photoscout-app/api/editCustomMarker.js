import * as FileSystem from 'expo-file-system';

export const editCustomMarker = async (marker) => {
  const filePath = FileSystem.documentDirectory + 'customLocations.json';

  try {
    const { exists } = await FileSystem.getInfoAsync(filePath);
    if (exists) {
      const result = await FileSystem.readAsStringAsync(filePath);
      const data = JSON.parse(result);
      console.log('editCustomMarker data:', data);

      // Find the index of the marker to edit
      const markerIndex = data.locations.findIndex(location => location.name === marker.name);
      if (markerIndex !== -1) {
        // Update the marker
        data.locations[markerIndex].notes = marker.notes;
        data.updated = new Date().toISOString();

        // Write the updated data back to the file
        const jsonString = JSON.stringify(data, null,  2);
        await FileSystem.writeAsStringAsync(filePath, jsonString);
        console.log('Marker edited and file updated successfully');
      } else {
        console.log('Marker not found');
      }
    } else {
      console.log('No custom markers to edit');
    }
  } catch (error) {
    console.error('Error editing custom marker:', error);
    throw error;
  }
};