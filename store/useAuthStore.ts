import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  username: string | null;
  role: string | null;
  token: string | null;
  expiresAt: string | null;
  login: (data: { username: string; role: string; token: string; expiresAt: string }) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      username: null,
      role: null,
      token: null,
      expiresAt: null,
      login: (data) => set({
        username: data.username,
        role: data.role,
        token: data.token,
        expiresAt: data.expiresAt,
      }),
      logout: () => set({
        username: null,
        role: null,
        token: null,
        expiresAt: null,
      }),
    }),
    {
      name: "auth-storage", // name of the item in AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;