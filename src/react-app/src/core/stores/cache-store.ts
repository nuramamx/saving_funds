import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { produce } from 'immer';
import CityInfo from '../interfaces/city-info';
import StateInfo from '../interfaces/state-info';
import AgreementInfo from '../interfaces/agreement-info';

interface CacheStore {
  states: StateInfo[];
  cities: CityInfo[];
  agreements: AgreementInfo[],
  setStates: (states: StateInfo[]) => void
  setCities: (cities: CityInfo[]) => void
  setAgreements: (agreements: AgreementInfo[]) => void
};

const useCacheStore = create(persist<CacheStore>(
  (set) => ({
    states: [],
    cities: [],
    agreements: [],
    setStates: (states: StateInfo[]) => set(
      produce((state: CacheStore) => {
        state.states = states;
      })
    ),
    setCities: (cities: CityInfo[]) => set(
      produce((state: CacheStore) => {
        state.cities = cities;
      })
    ),
    setAgreements: (agreements: AgreementInfo[]) => set(
      produce((state: CacheStore) => {
        state.agreements = agreements;
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