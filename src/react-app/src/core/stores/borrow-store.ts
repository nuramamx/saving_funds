import { create } from "zustand";
import { produce } from "immer";
import BorrowCreateCommand from "../interfaces/commands/borrow-create-command";

const borrowInitialState: BorrowCreateCommand = {
  id: 0,
  associateId: 0,
  requestedAmount: 0,
  period: 0,
  annualRate: 0,
  isFortnightly: undefined!,
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
  borrow: BorrowCreateCommand;
  setBorrow: (newState: BorrowCreateCommand) => void;
  updateGuaranteeFund: () => void;
  updateInterests: (period: number, rate: number) => void;
  updateTotalDue: () => void;
  updateNumberOfPayments: () => void;
  updateAmountToDeliver: () => void;
  clearBorrow: () => void;
}

const useBorrowStore = create<BorrowStore>()((set) => ({
  borrow: borrowInitialState,
  setBorrow: (newState: BorrowCreateCommand) =>
    set(produce((state: BorrowStore) => {
      state.borrow = newState;
    })),
  updateGuaranteeFund: () =>
    set(produce((state: BorrowStore) => {
      state.borrow.detail.guaranteeFund = state.borrow.requestedAmount * 2 / 100;
    })),
  updateInterests: (period: number, rate: number) =>
    set(produce((state: BorrowStore) => {
      const interests = [0,0,0];

      switch (period) {
        case 1:
          interests[0] = (state.borrow.requestedAmount * rate) / 100;
          state.borrow.detail.interests = interests[0];
          break;
        case 2:
          interests[0] = (state.borrow.requestedAmount * rate) / 100;
          interests[1] = ((state.borrow.requestedAmount / 2) * rate) / 100;
          state.borrow.detail.interests = interests[0] + interests[1];
          break;
        case 3:
          const second_year_balance = (state.borrow.requestedAmount - (state.borrow.requestedAmount / 3));
          interests[0] = (state.borrow.requestedAmount * rate) / 100;
          interests[1] = (second_year_balance * rate) / 100;
          interests[2] = ((second_year_balance - (state.borrow.requestedAmount / 3)) * rate) / 100;
          state.borrow.detail.interests = interests[0] + interests[1] + interests[2];
          break;
      }
    })),
  updateTotalDue: () =>
    set(produce((state: BorrowStore) => {
      state.borrow.detail.totalDue = (state.borrow.requestedAmount + state.borrow.detail.interests + state.borrow.detail.guaranteeFund);
    })),
  updateNumberOfPayments: () =>
    set(produce((state: BorrowStore) => {
      if (state.borrow.isFortnightly)
        state.borrow.detail.numberPayments = (state.borrow.period * 24);
      else
        state.borrow.detail.numberPayments = (state.borrow.period * 12);
    })),
  updateAmountToDeliver: () =>
    set(produce((state: BorrowStore) => {
      state.borrow.detail.amountDelivered = state.borrow.requestedAmount;
      if (state.borrow.detail.numberPayments > 0)
        state.borrow.detail.payment = (state.borrow.detail.totalDue / state.borrow.detail.numberPayments);
    })),
  clearBorrow: () =>
    set(produce((state: BorrowStore) => {
      state.borrow = borrowInitialState;
    }))
}));

export type { BorrowStore };
export default useBorrowStore;