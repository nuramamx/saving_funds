import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";
import PaymentCreateCommand from "../interfaces/commands/payment-create-command";

const paymentInitialState: PaymentCreateCommand = {
  borrowId: 0,
  number: 0,
  paidAmount: 0
};

interface PaymentStore {
  payment: PaymentCreateCommand;
  setPayment: (newState: PaymentCreateCommand) => void;
  clearPayment: () => void;
}

const usePaymentStore = create<PaymentStore>()(
  immer((set) => ({
    payment: paymentInitialState,
    setPayment: (newState: PaymentCreateCommand) =>
      set(produce((state: PaymentStore) => {
        state.payment = newState;
      })),
    clearPayment: () =>
      set(produce((state: PaymentStore) => {
        state.payment = paymentInitialState;
      }))
  }))
);

export type { PaymentStore };
export default usePaymentStore;