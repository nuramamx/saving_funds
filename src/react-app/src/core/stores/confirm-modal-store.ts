import { create } from "zustand";
import { produce } from "immer";

type ConfirmModalItem = {
  title?: string;
  message: string;
  show: boolean;
  data?: any;
};

type ConfirmModalStore = {
  confirm: ConfirmModalItem
  setConfirmModal: (confirm: ConfirmModalItem) => void
  reset: () => void
}

const useConfirmModalStore = create<ConfirmModalStore>((set) => ({
  confirm: {
    title: '',
    message: '',
    show: false
  },
  setConfirmModal: (confirm: ConfirmModalItem) => set(
    produce((state: ConfirmModalStore) => {
      state.confirm = confirm;
    })
  ),
  reset: () => set(
    produce((state: ConfirmModalStore) => {
      state.confirm = {
        title: '',
        message: '',
        show: false
      };
    })
  )
}));

export type { ConfirmModalItem, ConfirmModalStore }
export default useConfirmModalStore;