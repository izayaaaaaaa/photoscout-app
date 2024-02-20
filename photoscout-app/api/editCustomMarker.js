import * as FileSystem from 'expo-file-system';

export const editCustomMarker = async (marker) => {
  const filePath = FileSystem.documentDirectory + 'customLocations.json';

  try {
    const { exists } = await FileSystem.getInfoAsync(filePath);
    if (exists) {
      const result = await FileSystem.readAsStringAsync(filePath);
      const data = JSON.parse(result);
      console.log('editCustomMarker data:', data);
      if (marker.name !== -1) {
        for(let i = 0; i < data.locations.length; i++) {
          if(data.locations[i].name === marker.name) {
            console.log('marker found');
            data.locations[i].notes = marker.notes;
          }
        }
        data.updated = new Date().toISOString();
        const jsonString = JSON.stringify(data, null, 2);
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