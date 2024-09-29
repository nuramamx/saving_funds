import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type LayoutStore = {
  selectedMenu: string;
  selectedSidebarMenu: string;
  setSelectedMenu: (menu: string) => void;
  setSelectedSidebarMenu: (menu: string) => void;
  restoreMenu: () => void;
  restoreSidebarMenu: () => void;
  reset: () => void;
};

const useLayoutStore = create(persist<LayoutStore>(
  (set) => ({
    selectedMenu: '',
    selectedSidebarMenu: '',
    setSelectedMenu: (menu: string) => set(({ selectedMenu: menu })),
    setSelectedSidebarMenu: (menu: string) => set(({ selectedSidebarMenu: menu })),
    restoreMenu: () => set(({ selectedMenu: '' })),
    restoreSidebarMenu: () => set(({ selectedSidebarMenu: '' })),
    reset: () => set(
      produce((state: LayoutStore) => {
        state.selectedMenu = '';
        state.selectedSidebarMenu = '';
        localStorage.removeItem('layout_store');
      })
    )
  }),
  {
    name: 'layout_store',
    storage: createJSONStorage(() => localStorage)
  }
));

export type { LayoutStore };
export default useLayoutStore;