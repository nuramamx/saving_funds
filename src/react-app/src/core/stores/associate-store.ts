import { create } from "zustand";
import { produce } from "immer";
import AssociateComposerCommand from "../interfaces/commands/associate-composer-command";

const associateInitialState: AssociateComposerCommand = {
  name: '',
  rfc: '',
  gender: '',
  detail: {
    agreement: '',
    agreementId: 0,
    dependencyKey: '',
    category: '',
    salary: 0,
    socialContribution: 0,
    frequentContribution: 0,
    requestDate: new Date()
  },
  address: {
    stateId: 0,
    cityId: 0,
    street: '',
    settlement: '',
    town: '',
    postalCode: '',
    phone: '',
    mobile: '',
    email: ''
  },
  workplace: {
    key: '',
    name: '',
    phone: ''
  },
  beneficiaries: [
    { name: '', percentage: 0 },
    { name: '', percentage: 0 },
    { name: '', percentage: 0 },
    { name: '', percentage: 0 },
    { name: '', percentage: 0 }
  ]
}

interface AssociateStore {
  associate: AssociateComposerCommand;
  stateId: number,
  setAssociate: (newState: AssociateComposerCommand) => void,
  setStateId: (value: number) => void,
  updateBeneficiaryName: (index: number, name: string) => void,
  updateBeneficiaryPercentage: (index: number, percentage: number) => void,
  clearAssociate: () => void
};

const useAssociateStore = create<AssociateStore>()((set) => ({
  associate: associateInitialState,
  stateId: 0,
  setAssociate: (newState: AssociateComposerCommand) =>
    set(produce((state: AssociateStore) => {
      state.associate = newState;
    })),
  setStateId: (value: number) =>
    set(produce((state: AssociateStore) => {
      state.associate.address.stateId = value;
      state.stateId = value;
    })),
  updateBeneficiaryName: (index: number, name: string) =>
    set(produce((state: AssociateStore) => {
      state.associate.beneficiaries[index].name = name;
    })),
  updateBeneficiaryPercentage: (index: number, percentage: number) =>
    set(produce((state: AssociateStore) => {
      state.associate.beneficiaries[index].percentage = percentage;
    })),
  clearAssociate: () =>
    set(produce((state: AssociateStore) => {
      state.associate = associateInitialState;
      state.stateId = 0;
    }))
}));

export default useAssociateStore;