import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";
import CreateBorrowCommand from "../interfaces/commands/create-borrow-command";

const borrowInitialState: CreateBorrowCommand = {
  id: 0,
  associateId: 0,
  requestedAmount: 0,
  period: 0,
  annualRate: 0,
  isFortnightly: false,
  requestDate: undefined!,
  startAt: undefined!,
  detail: {
    borrowId: 0,
    numberPayments: 0,
    interests: 0,
    totalDue: 0,
    guaranteeFund: 0,
    payment: 0,
    amountDelivered: 0
  }
};

interface BorrowStore {
  borrow: CreateBorrowCommand;
  setBorrow: (newState: CreateBorrowCommand) => void;
  updateGuaranteeFund: () => void;
  updateInterests: (period: number, rate: number) => void;
  updateTotalDue: () => void;
  updateNumberOfPayments: () => void;
  updateAmountToDeliver: () => void;
  clearBorrow: () => void;
}

const useBorrowStore = create<BorrowStore>()(
  immer((set) => ({
    borrow: borrowInitialState,
    setBorrow: (newState: CreateBorrowCommand) =>
      set(produce((state: BorrowStore) => {
        state.borrow = newState;
      })),
    updateGuaranteeFund: () =>
      set(produce((state: BorrowStore) => {
        state.borrow.detail.guaranteeFund = state.borrow.requestedAmount * 2 / 100;
      })),
    updateInterests: (period: number, rate: number) =>
      set(produce((state: BorrowStore) => {
        const calculatedRate = (rate / (state.borrow.isFortnightly ? 24 : 12)) / 100;
        const calculatedPeriod = (period * (state.borrow.isFortnightly ? 24 : 12));
        const calculatedDivisor = 1 - (1 + calculatedRate) ** -calculatedPeriod;

        if (calculatedDivisor > 0) {
          const result = ((state.borrow.requestedAmount * calculatedRate) / calculatedDivisor);
          state.borrow.detail.interests = (result * calculatedPeriod) - state.borrow.requestedAmount
          state.borrow.detail.payment = result;
        }
      })),
    updateTotalDue: () =>
      set(produce((state: BorrowStore) => {
        state.borrow.detail.totalDue = (state.borrow.requestedAmount + state.borrow.detail.interests);
      })),
    updateNumberOfPayments: () =>
      set(produce((state: BorrowStore) => {
        if (state.borrow.isFortnightly)
          state.borrow.detail.numberPayments = (state.borrow.period * 12);
        else
          state.borrow.detail.numberPayments = (state.borrow.period * 24);
      })),
    updateAmountToDeliver: () =>
      set(produce((state: BorrowStore) => {
        state.borrow.detail.amountDelivered = state.borrow.requestedAmount;
      })),
    clearBorrow: () =>
      set(produce((state: BorrowStore) => {
        state.borrow = borrowInitialState;
      }))
  }))
);

export type { BorrowStore };
export default useBorrowStore;