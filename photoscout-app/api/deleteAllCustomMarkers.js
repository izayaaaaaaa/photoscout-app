import * as FileSystem from 'expo-file-system';

export const deleteAllCustomMarkers = async () => {
  const filePath = FileSystem.documentDirectory + 'customLocations.json';
  try {
    const { exists } = await FileSystem.getInfoAsync(filePath);
    if (exists) {
      const initialContent = JSON.stringify({
        locations: [],
        updated: new Date().toISOString()
      }, null,  2);
      await FileSystem.writeAsStringAsync(filePath, initialContent);
    } else {
      console.log('No custom markers to delete');
    }
  } catch (error) {
    console.error('Error deleting all custom markers:', error);
    throw error;
  }
};