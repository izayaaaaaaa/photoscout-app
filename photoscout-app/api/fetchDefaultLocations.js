export const fetchDefaultLocations = () => {
  return fetch('https://pastebin.com/raw/fkAyNYGF')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => {
    console.error('Error fetching markers:', error);
    throw error;
  });
};