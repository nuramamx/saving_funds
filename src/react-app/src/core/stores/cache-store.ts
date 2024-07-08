import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { produce } from 'immer';
import CityInfo from '../interfaces/city-info';
import StateInfo from '../interfaces/state-info';
import AgreementInfo from '../interfaces/agreement-info';
import AnnualRateInfo from '../interfaces/annual-rates-info';

interface CacheStore {
  states: StateInfo[];
  cities: CityInfo[];
  agreements: AgreementInfo[],
  annualRates: AnnualRateInfo[],
  setStates: (states: StateInfo[]) => void,
  setCities: (cities: CityInfo[]) => void,
  setAgreements: (agreements: AgreementInfo[]) => void,
  setAnnualRates: (annualRates: AnnualRateInfo[]) => void
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
    )
  }),
  {
    name: 'cache-store',
    storage: createJSONStorage(() => localStorage)
  }
));

export type { CacheStore };
export default useCacheStore;