import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { produce } from 'immer';
import CityInfo from '../interfaces/city-info';
import StateInfo from '../interfaces/state-info';

interface CacheStore {
  states: StateInfo[];
  cities: CityInfo[];
  setStates: (states: StateInfo[]) => void
  setCities: (cities: CityInfo[]) => void
};

const useCacheStore = create(persist<CacheStore>(
  (set) => ({
    states: [],
    cities: [],
    setStates: (states: StateInfo[]) => set(
      produce((state: CacheStore) => {
        state.states = states;
      })
    ),
    setCities: (cities: CityInfo[]) => set(
      produce((state: CacheStore) => {
        state.cities = cities;
      })
    )
  }),
  {
    name: 'cache-store',
    storage: createJSONStorage(() => localStorage)
  }
));

export type { CacheStore };
export default useCacheStore;