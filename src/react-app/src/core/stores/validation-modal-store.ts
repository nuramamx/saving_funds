import { create } from "zustand";
import { produce } from "immer";

type ValidationModalItem = {
  title?: string;
  message: string;
  show: boolean;
  data?: any;
  errors: string[];
};

type ValidationModalStore = {
  validation: ValidationModalItem
  setValidationModal: (validation: ValidationModalItem) => void
  closeValidationModal: () => void
}

const useValidationModalStore = create<ValidationModalStore>((set) => ({
  validation: {
    title: '',
    message: '',
    show: false,
    errors: []
  },
  setValidationModal: (validation: ValidationModalItem) => set(
    produce((state: ValidationModalStore) => {
      state.validation = validation;
    })
  ),
  closeValidationModal: () => set(
    produce((state: ValidationModalStore) => {
      state.validation = {
        title: '',
        message: '',
        show: false,
        errors: []
      };
    })
  )
}));

export type { ValidationModalItem, ValidationModalStore }
export default useValidationModalStore;