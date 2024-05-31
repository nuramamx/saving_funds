import { create } from "zustand";
import { produce } from "immer";
import CreateAssociateCommand from "../interfaces/commands/create-associate-command";
import StateInfo from "../interfaces/state-info";

const associateInitialState: CreateAssociateCommand = {
  name: {
    firstname: "",
    middlename: "",
    paternalLastname: "",
    maternalLastname: ""
  },
  rfc: "",
  gender: "",
  detail: {
    agreementId: 0,
    dependencyKey: "",
    category: "",
    salary: 0,
    socialContribution: 0,
    fortnightlyContribution: 0,
    requestDate: undefined!
  },
  address: {
    cityId: 0,
    street: "",
    settlement: "",
    town: "",
    postalCode: "",
    phone: "",
    mobile: "",
    email: ""
  },
  workplace: {
    key: "",
    name: "",
    phone: ""
  },
  beneficiaries: [
    { name: "", percentage: 0 },
    { name: "", percentage: 0 },
    { name: "", percentage: 0 },
    { name: "", percentage: 0 },
    { name: "", percentage: 0 }
  ]
}

interface AssociateStore {
  associate: CreateAssociateCommand;
  stateId: number,
  setAssociate: (newState: CreateAssociateCommand) => void,
  setStateId: (value: number) => void,
  updateBeneficiaryName: (index: number, name: string) => void,
  updateBeneficiaryPercentage: (index: number, percentage: number) => void,
  clearAssociate: () => void
};

const useAssociateStore = create<AssociateStore>((set) => ({
  associate: associateInitialState,
  stateId: 0,
  setAssociate: (newState: CreateAssociateCommand) => set(
    produce((state: AssociateStore) => {
      state.associate = newState;
    })
  ),
  setStateId: (value: number) => set(
    produce((state: AssociateStore) => {
      console.log(value);
      state.stateId = value;
    })
  ),
  updateBeneficiaryName: (index: number, name: string) => set(
    produce((state: AssociateStore) => {
      state.associate.beneficiaries[index].name = name;
    })
  ),
  updateBeneficiaryPercentage: (index: number, percentage: number) => set(
    produce((state: AssociateStore) => {
      state.associate.beneficiaries[index].percentage = percentage;
    })
  ),
  clearAssociate: () => set(
    produce((state: AssociateStore) => {
      state.associate = associateInitialState;
      state.stateId = 0;
    })
  )
}));

export default useAssociateStore;