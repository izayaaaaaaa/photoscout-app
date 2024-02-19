export const fetchLocation = async (currentLocation) => {
  // const geocodeAPI = process.env.GEOCODE_API_KEY; // env var not working?
  const geocodeAPI = '65d3751fa5a49542526138pvqc999ce'
  try {
    const response = await fetch(`https://geocode.maps.co/search?q=${currentLocation}&api_key=${geocodeAPI}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('fetchLocation Error fetching location:', error);
    throw error;
  }
};