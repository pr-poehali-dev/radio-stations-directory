import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Station, STATIONS } from '@/data/stations';

interface HistoryEntry {
  stationId: string;
  listenedAt: string;
}

interface RadioState {
  stations: Station[];
  currentStation: Station | null;
  isPlaying: boolean;
  volume: number;
  favorites: string[];
  history: HistoryEntry[];

  // Player actions
  play: (station: Station) => void;
  stop: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;

  // Favorites
  toggleFavorite: (stationId: string) => void;
  isFavorite: (stationId: string) => boolean;

  // Admin
  addStation: (station: Omit<Station, 'id'>) => void;
  updateStation: (id: string, data: Partial<Station>) => void;
  deleteStation: (id: string) => void;
}

export const useRadioStore = create<RadioState>()(
  persist(
    (set, get) => ({
      stations: STATIONS,
      currentStation: null,
      isPlaying: false,
      volume: 80,
      favorites: [],
      history: [],

      play: (station) => {
        const now = new Date().toISOString();
        set((state) => ({
          currentStation: station,
          isPlaying: true,
          history: [
            { stationId: station.id, listenedAt: now },
            ...state.history.filter(h => h.stationId !== station.id).slice(0, 49),
          ],
        }));
      },

      stop: () => set({ isPlaying: false }),

      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

      setVolume: (volume) => set({ volume }),

      toggleFavorite: (stationId) =>
        set((state) => ({
          favorites: state.favorites.includes(stationId)
            ? state.favorites.filter((id) => id !== stationId)
            : [...state.favorites, stationId],
        })),

      isFavorite: (stationId) => get().favorites.includes(stationId),

      addStation: (data) =>
        set((state) => ({
          stations: [
            ...state.stations,
            { ...data, id: Date.now().toString() },
          ],
        })),

      updateStation: (id, data) =>
        set((state) => ({
          stations: state.stations.map((s) => (s.id === id ? { ...s, ...data } : s)),
        })),

      deleteStation: (id) =>
        set((state) => ({
          stations: state.stations.filter((s) => s.id !== id),
          currentStation: state.currentStation?.id === id ? null : state.currentStation,
        })),
    }),
    {
      name: 'radiowave-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        history: state.history,
        volume: state.volume,
        stations: state.stations,
      }),
    }
  )
);
