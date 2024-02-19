export const fetchDefaultLocations = async () => {
  try {
    const response = await fetch('https://pastebin.com/raw/fkAyNYGF');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching markers:', error);
    throw error;
  }
};