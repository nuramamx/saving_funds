import { create } from 'zustand';
import { produce } from 'immer';
import { TourGuideClient } from '@sjmc11/tourguidejs';

interface HelpStore {
  path: string,
  current: TourGuideClient | undefined,
  isShowing: boolean,
  showHelp: (path: string) => void,
  hideHelp: () => void
};

const useHelpStore = create<HelpStore>(
  (set) => ({
    path: '',
    current: undefined,
    isShowing: false,
    showHelp: (path: string) => set(
      produce((state: HelpStore) => {
        // if (state.isShowing) state.hideHelp();
        // if (state.current !== undefined) state.current = undefined;
        
        const tg = new TourGuideClient();
        tg.start();

        state.isShowing = true;
        state.current = tg;
      })
    ),
    hideHelp: () => set(
      produce((state: HelpStore) => {
        if (state.current !== undefined) {
          state.current.finishTour(true);
          state.current = undefined;
          state.isShowing = false;
        }
      })
    ),
  })
);

export type { HelpStore };
export default useHelpStore;