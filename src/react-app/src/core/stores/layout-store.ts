import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type LayoutStore = {
  selectedMenu: string;
  selectedSidebarMenu: string;
  setSelectedMenu: (menu: string) => void;
  setSelectedSidebarMenu: (menu: string) => void;
  restoreMenu: () => void;
  restoreSidebarMenu: () => void;
};

const useLayoutStore = create(persist<LayoutStore>(
  (set) => ({
    selectedMenu: 'dashboard',
    selectedSidebarMenu: '',
    setSelectedMenu: (menu: string) => set(({ selectedMenu: menu })),
    setSelectedSidebarMenu: (menu: string) => set(({ selectedSidebarMenu: menu })),
    restoreMenu: () => set(({ selectedMenu: 'dashboard' })),
    restoreSidebarMenu: () => set(({ selectedSidebarMenu: '' }))
  }),
  {
    name: 'layout-store',
    storage: createJSONStorage(() => localStorage)
  }
));

export type { LayoutStore };
export default useLayoutStore;