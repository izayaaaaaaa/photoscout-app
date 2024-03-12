import * as FileSystem from 'expo-file-system';

export const addNewMarker = async (newMarker) => {
  const filePath = FileSystem.documentDirectory + 'customLocations.json';
  try {
    const { exists } = await FileSystem.getInfoAsync(filePath);
    if (!exists) {
      const initialContent = JSON.stringify({
        locations: [],
        updated: new Date().toISOString()
      }, null,  2);
      await FileSystem.writeAsStringAsync(filePath, initialContent);
    }
    const result = await FileSystem.readAsStringAsync(filePath);
    const data = JSON.parse(result);
    data.locations.push(newMarker);
    data.updated = new Date().toISOString();
    const jsonString = JSON.stringify(data, null,  2);
    await FileSystem.writeAsStringAsync(filePath, jsonString);
    console.log('Marker added and file updated successfully');
    // Delay reading the file to ensure synchronization
    setTimeout(() => {
      FileSystem.readAsStringAsync(filePath)
      .then((result) => {
        console.log('File content after delay:', result);
      })
      .catch((error) => {
        console.error('Error reading file after delay:', error);
      });
    },  1000); // Delay of  1 second
  } catch (error) {
    console.error('Error writing file:', error);
  }
};