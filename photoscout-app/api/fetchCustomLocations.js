import * as FileSystem from 'expo-file-system';

export const fetchCustomLocations = async () => {
  const filePath = FileSystem.documentDirectory + 'customLocations.json';
  try {
    const { exists } = await FileSystem.getInfoAsync(filePath);
    if (exists) {
      const result = await FileSystem.readAsStringAsync(filePath);
      const data = JSON.parse(result);
      return data.locations;
    } else {
      console.log('No custom locations file found');
      return [];
    }
  } catch (error) {
    console.error('Error reading custom locations file:', error);
    return [];
  }
};