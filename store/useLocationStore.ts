import { create } from 'zustand';
import * as Location from 'expo-location';
import getLocationData from '../utils/Location/Location';


interface LocationState {
  coords: { latitude: number; longitude: number } | null;
  address: string | null;
  loading: boolean;
  fetchLocation: () => Promise<void>;
}

export const useLocationStore = create<LocationState>((set) => ({
  coords: null,
  address: null,
  loading: false,

  fetchLocation: async () => {
    try {
      set({ loading: true });
      const { status, canAskAgain } = await Location.getForegroundPermissionsAsync();

      if (status !== 'granted') {
        if (canAskAgain) {
          const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
          if (newStatus !== 'granted') {
            set({ address: '', loading: false });
            return;
          }
        } else {
          set({ address: '', loading: false });
          return;
        }
      }

      // Get current position
      const position =
        (await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })) ||
        (await Location.getLastKnownPositionAsync());

      if (!position) {
        set({ address: '', loading: false });
        return;
      }

      const { latitude, longitude } = position.coords;
      set({ coords: { latitude, longitude } });

      const data = await getLocationData(latitude.toString(), longitude.toString());
      const {
        house_number,
        road,
        neighbourhood,
        suburb,
        city,
        town,
        village,
        county,
        postcode,
      } = data || {};

      const formattedAddress =
        [
          house_number,
          road,
          neighbourhood,
          suburb,
          city || town || village,
          county,
          postcode,
        ]
          .filter(Boolean)
          .join(', ') || '';

      set({ address: formattedAddress, loading: false });
    } catch {
      set({ address: '', loading: false });
    }
  },
}));
