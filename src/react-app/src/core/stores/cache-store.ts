import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import CityInfo from '../interfaces/city-info';
import StateInfo from '../interfaces/state-info';

type CacheStore = {
    states: CityInfo[];
    cities: StateInfo[];
};

const useCacheStore = create(persist<CacheStore>(
  (set) => ({
    states: [],
    cities: []
  }),
  {
    name: 'cache-store',
    storage: createJSONStorage(() => localStorage)
  }
));

export type { CacheStore };
export default useCacheStore;