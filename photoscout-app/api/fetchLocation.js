export const fetchLocation = (location) => {
  // const geocodeAPI = process.env.GEOCODE_API_KEY; // env var not working?
  const geocodeAPI = '65d3751fa5a49542526138pvqc999ce'
  console.log('geocodeAPI:', geocodeAPI);
  console.log('location:', location);
  return fetch(`https://geocode.maps.co/search?q=${location}&api_key=${geocodeAPI}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('fetchLocation Error fetching location:', error);
      throw error;
    });
};