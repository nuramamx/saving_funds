import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { produce } from 'immer';
import CityInfo from '../interfaces/info/city-info';
import StateInfo from '../interfaces/info/state-info';
import AgreementInfo from '../interfaces/info/agreement-info';
import AnnualRateInfo from '../interfaces/info/annual-rates-info';

interface CacheStore {
  states: StateInfo[];
  cities: CityInfo[];
  agreements: AgreementInfo[],
  annualRates: AnnualRateInfo[],
  setStates: (states: StateInfo[]) => void,
  setCities: (cities: CityInfo[]) => void,
  setAgreements: (agreements: AgreementInfo[]) => void,
  setAnnualRates: (annualRates: AnnualRateInfo[]) => void,
  reset: () => void
};

const useCacheStore = create(persist<CacheStore>(
  (set) => ({
    states: [],
    cities: [],
    agreements: [],
    annualRates: [],
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
    ),
    setAnnualRates: (annualRates: AnnualRateInfo[]) => set(
      produce((state: CacheStore) => {
        state.annualRates = annualRates;
      })
    ),
    reset: () => set(
      produce((state: CacheStore) => {
        state.states = [];
        state.cities = [];
        state.agreements = [];
        state.annualRates = [];
        localStorage.removeItem('cache_store');
      })
    )
  }),
  {
    name: 'cache_store',
    storage: createJSONStorage(() => localStorage)
  }
));

export type { CacheStore };
export default useCacheStore;