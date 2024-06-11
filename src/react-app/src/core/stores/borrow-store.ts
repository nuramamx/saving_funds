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
  requestDate: 0,
  isFortnightly: false,
  detail: {
    borrowId: 0,
    numberPayments: 0,
    interestToPay: 0,
    guaranteeFund: 0,
    payment: 0,
    totalDue: 0,
    amountDelivered: 0
  }
};

interface BorrowStore {
  borrow: CreateBorrowCommand;
  setBorrow: (newState: CreateBorrowCommand) => void;
  updateGuaranteeFund: () => void;
  updateInterests: () => void;
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
    updateInterests: () =>
      set(produce((state: BorrowStore) => {
        state.borrow.detail.interestToPay = state.borrow.requestedAmount * 5 / 0.55;
      })),
    clearBorrow: () =>
      set(produce((state: BorrowStore) => {
        state.borrow = borrowInitialState;
      }))
  }))
);

export type { BorrowStore };
export default useBorrowStore;