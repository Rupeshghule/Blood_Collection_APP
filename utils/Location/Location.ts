import axios from 'axios';

const getLocationData = async (lat: string, long: string) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        lat,
        lon: long,
        format: 'json',
        'accept-language': 'en',
      },
      headers: {
        'User-Agent': 'ITKlatch/1.0 (mitroz.rupeshg@gmail.com)',
      },
    });

    return {
      ...response.data.address,
      fullAddress: response.data.display_name || '',
      latitude: lat,
      longitude: long,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown location error';
    console.error('Error fetching location data:', errorMessage);
    return null;
  }
};

export default getLocationData;
